import mongoose from "mongoose"

const aiAnalysisSchema = new mongoose.Schema(
  {
    overallFindings: {
      type: String,
      required: true
    },
    severityLevel: {
      type: String,
      enum: ["Normal", "Low", "Moderate", "High"],
      default: "Normal"
    },
    detectedRegions: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"DetectedRegion"
    },
    rawApiResponse: {
      type: mongoose.Schema.Types.Mixed
      // we have used mixed here so that mongoose can accept any kind of data without specifyning specialized schema
    }
  },
  { timestamps: true }
);

export const AIanalysis = mongoose.model("AIanalysis",aiAnalysisSchema);