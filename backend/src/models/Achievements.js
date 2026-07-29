import mongoose from "mongoose";

const AchievementsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        type: { type: String, enum: ["award, certification"], required: true },
        dateAwarded: { type: Date },
        credentialURL: { type: String },
        description: { type: String },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Achievements", AchievementsSchema);