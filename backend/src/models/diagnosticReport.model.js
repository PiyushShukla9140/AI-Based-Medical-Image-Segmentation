import mongoose from "mongoose";

const diagnosticReportSchema = new mongoose.Schema(
  {
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalScan",
      required: true
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reportPdfUrl: {
      type: String,
      default: ""
    },
    doctorNotes: {
      type: String,
      default: ""
    },
    finalVerdict: {
      type: String,
      enum: ["Pending Review", "Approved", "Requires Further Scan", "Discharged"],
      default: "Pending Review"
    }
  },
  { timestamps: true }
);

export const DiagnosticReport = mongoose.model("DiagnosticReport", diagnosticReportSchema);