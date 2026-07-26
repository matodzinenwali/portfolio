import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//error-handling middlewarre - every controller`s next(err) lands here
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({message: err.message || "server error"});
});

export default app;