import { useCallback, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState, EmptyState } from './StatusState';
import './ResourceManager.css';

const emptyValues = (fields) =>
  Object.fromEntries(fields.map((f) => [f.name, f.type === 'select' ? f.options[0] : '']));

export default function ResourceManager({ resourceApi, fields, titleField = 'title' }) {
  const fetchAll = useCallback(() => resourceApi.getAll(), [resourceApi]);
  const { data, status, refetch } = useFetch(fetchAll, [resourceApi]);
  const [form, setForm] = useState(() => emptyValues(fields));
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      await resourceApi.create(form);
      setForm(emptyValues(fields));
      refetch();
    } catch (err) {
      setFormError('Could not save. Check required fields and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this item?')) return;
    await resourceApi.remove(id);
    refetch();
  }

  return (
    <div className="resource-manager">
      <form className="resource-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="resource-field">
            <span className="mono">{field.label}</span>
            {field.type === 'select' ? (
              <select
                value={form[field.name]}
                onChange={(e) => updateField(field.name, e.target.value)}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={form[field.name]}
                onChange={(e) => updateField(field.name, e.target.value)}
                required={field.required}
                rows={3}
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={form[field.name]}
                onChange={(e) => updateField(field.name, e.target.value)}
                required={field.required}
              />
            )}
          </label>
        ))}
        {formError && <p className="resource-error mono">{formError}</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'saving...' : 'add'}
        </button>
      </form>

      <div className="resource-list">
        {status === 'loading' && <LoadingState label="loading" />}
        {status === 'error' && <ErrorState message="Couldn't load items." onRetry={refetch} />}
        {status === 'success' && data?.length === 0 && <EmptyState />}
        {status === 'success' &&
          data?.map((item) => (
            <div key={item._id} className="resource-row">
              <span className="resource-row-title mono">{item[titleField]}</span>
              <button className="btn resource-delete" onClick={() => handleDelete(item._id)}>
                delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
