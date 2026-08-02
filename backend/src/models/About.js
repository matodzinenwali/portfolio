import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
    {
        bio: { type: String, required: true },
        photoUrl: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("About", AboutSchema);