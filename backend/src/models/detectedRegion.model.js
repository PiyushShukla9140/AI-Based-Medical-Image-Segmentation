import mongoose from "mongoose";

// Sub-schema for Detected Regions & Coordinates
const detectedRegionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: "Anomaly"
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
      default: 1.0
    },
    // Gemini normalized bounding coordinates [0 - 1000]
    box2d: {
      ymin: { type: Number, required: true },
      xmin: { type: Number, required: true },
      ymax: { type: Number, required: true },
      xmax: { type: Number, required: true }
    },
    // Optional polygon points for detailed contouring
    polygonCoordinates: [
      {
        x: { type: Number },
        y: { type: Number }
      }
    ],
    color: {
      type: String,
      default: "#FF3B30" // Red highlight default
    },
    clinicalNote: {
      type: String,
      default: ""
    },
    isDoctorVerified: {
      type: Boolean,
      default: false
    },
    doctorFeedback: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export const DetectedRegion = mongoose.model("DetectedRegion",detectedRegionSchema);