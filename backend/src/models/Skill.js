import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String },
    },
    { timestamps: true }
);