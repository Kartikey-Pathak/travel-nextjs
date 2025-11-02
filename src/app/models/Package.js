import mongoose, { Schema } from "mongoose";

const timelineSchema = new Schema({
  day: Number,
  title: String,
  points: [String],
});

const packageSchema = new Schema({
  city: { type: String, required: true, unique: true },
  type: { type: String, enum: ["domestic", "international"], required: true }, // ✅ new field
  img: String,
  days: String,
  des: String,
  timeline: [timelineSchema],
});

export default mongoose.models.Package || mongoose.model("Package", packageSchema);
