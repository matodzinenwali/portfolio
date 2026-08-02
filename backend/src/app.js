import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from './routes/authRoutes.js';
import achievementsRoutes from "./routes/achievementsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);

//error-handling middlewarre - every controller`s next(err) lands here
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({message: err.message || "server error"});
});

export default app;