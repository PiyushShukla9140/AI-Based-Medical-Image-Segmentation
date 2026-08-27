import mongoose from "mongoose"

const medicalScanSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    scanType: {
      type: String,
      enum: ["Chest X-Ray", "Brain MRI", "CT Scan", "Skin Lesion", "Other","Hips X-Ray"],
      required: true
    },
    bodyPart: {
      type: String,
      default: "General"
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL/path is required"]
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded"
    },
    analysis:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"AIanalysis"
    }
  },
  { timestamps: true }
);

export const MedicalScan = mongoose.model("MedicalScan", medicalScanSchema);