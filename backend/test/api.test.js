import assert from 'node:assert/strict';
import { after, afterEach, before, mock, test } from 'node:test';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Skill from '../src/models/Skill.js';
import About from '../src/models/About.js';

process.env.JWT_SECRET = randomBytes(32).toString('hex');
process.env.CORS_ORIGINS = 'https://portfolio.example.com';
const { default: app } = await import('../src/app.js');
const token = jwt.sign({ userId: '507f1f77bcf86cd799439011' }, process.env.JWT_SECRET);
let server;
let baseUrl;

before(async () => {
    server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    baseUrl = 'http://127.0.0.1:' + server.address().port;
});
afterEach(() => mock.restoreAll());
after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
}));

function request(path, { method = 'GET', body, authenticated = false, headers = {} } = {}) {
    return fetch(baseUrl + path, {
        method,
        headers: {
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            ...(authenticated ? { Authorization: 'Bearer ' + token } : {}),
            ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
}

test('all implemented write routes require authentication', async () => {
    for (const [path, method] of [
        ['/api/projects', 'POST'], ['/api/skills', 'POST'],
        ['/api/achievements', 'POST'], ['/api/about', 'PUT'],
    ]) {
        const response = await request(path, { method, body: {} });
        assert.equal(response.status, 401, path);
    }
});

test('POST skills matches the dashboard contract', async () => {
    mock.method(Skill, 'create', async (data) => ({ _id: 'skill-id', ...data }));
    const response = await request('/api/skills', {
        method: 'POST', body: { name: 'Node.js' }, authenticated: true,
    });
    assert.equal(response.status, 201);
    assert.equal((await response.json()).name, 'Node.js');
});

test('single-skill lookup calls the repository and handles missing records', async () => {
    const find = mock.method(Skill, 'findById', async (id) => ({ _id: id, name: 'Node.js' }));
    const id = '507f1f77bcf86cd799439011';
    const response = await request('/api/skills/' + id);
    assert.equal(response.status, 200);
    assert.equal((await response.json())._id, id);
    find.mock.mockImplementation(async () => null);
    assert.equal((await request('/api/skills/' + id)).status, 404);
});

test('missing About returns 404 and missing bio returns 400', async () => {
    mock.method(About, 'findOne', async () => null);
    assert.equal((await request('/api/about')).status, 404);
    const response = await request('/api/about', { method: 'PUT', body: {}, authenticated: true });
    assert.equal(response.status, 400);
});

test('invalid IDs and model validation errors return 400', async () => {
    mock.method(Skill, 'findById', async () => {
        throw new mongoose.Error.CastError('ObjectId', 'invalid', '_id');
    });
    assert.equal((await request('/api/skills/invalid')).status, 400);
    mock.method(Skill, 'create', async () => { throw new mongoose.Error.ValidationError(); });
    assert.equal((await request('/api/skills', {
        method: 'POST', body: { name: 'Node.js' }, authenticated: true,
    })).status, 400);
});

test('duplicate keys return 409', async () => {
    mock.method(Skill, 'create', async () => { throw Object.assign(new Error('duplicate'), { code: 11000 }); });
    const response = await request('/api/skills', {
        method: 'POST', body: { name: 'Node.js' }, authenticated: true,
    });
    assert.equal(response.status, 409);
    assert.deepEqual(await response.json(), { message: 'Resource already exists' });
});

test('unexpected errors do not expose internal messages', async () => {
    mock.method(console, 'error', () => {});
    mock.method(Skill, 'findById', async () => { throw new Error('private database details'); });
    const response = await request('/api/skills/507f1f77bcf86cd799439011');
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { message: 'Server error' });
});

test('malformed JSON returns 400', async () => {
    const response = await fetch(baseUrl + '/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{',
    });
    assert.equal(response.status, 400);
});

test('health reports unavailable until the database is connected', async () => {
    const response = await request('/api/health');
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { status: 'unavailable' });
});

test('CORS permits the configured frontend but not unrelated origins', async () => {
    for (const origin of ['https://portfolio.example.com', 'https://unrelated.example.com']) {
        const response = await request('/api/skills', {
            method: 'OPTIONS',
            headers: { Origin: origin, 'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'authorization,content-type' },
        });
        assert.equal(response.status, 204);
        assert.equal(response.headers.get('access-control-allow-origin'),
            origin === 'https://portfolio.example.com' ? origin : null);
    }
});
