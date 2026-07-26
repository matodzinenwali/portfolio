import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        repoUrl: String,
        imageUrl: String,
        skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    },
    { timestamps: true }
);