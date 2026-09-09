import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from './routes/authRoutes.js';
import achievementsRoutes from "./routes/achievementsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

const app = express();

// Global configuration: Parses incoming JSON bodies for all routes
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => {
    const ready = mongoose.connection.readyState === 1;
    res.status(ready ? 200 : 503).json({ status: ready ? 'ok' : 'unavailable' });
});

// Mount the router onto a specific path prefix
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);

//error-handling middlewarre - every controller`s next(err) lands here
app.use(errorHandler);

export default app;
