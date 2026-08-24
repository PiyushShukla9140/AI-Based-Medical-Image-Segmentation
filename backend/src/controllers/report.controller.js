import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import {DiagnosticReport} from "../models/diagnosticReport.model.js"
import { MedicalScan } from "../models/medicalScan.model.js";

const createReport = asyncHandler(async(req,res)=>{
    const { scanId, doctorNotes, finalVerdict, reportPdfUrl } = req.body;

    if (!scanId) {
        throw new ApiError(400, "scanId is required to generate a report.");
    }

    // Ensure scan exists
    const scan = await MedicalScan.findById(scanId);
    if (!scan) {
        throw new ApiError(404, "Medical scan not found.");
    }

    // Check if a report already exists for this scan
    const existingReport = await DiagnosticReport.findOne({ scanId });
    if (existingReport) {
        throw new ApiError(409, "A diagnostic report already exists for this scan.");
    }

    const report = await DiagnosticReport.create({
        scanId,
        generatedBy: req.user._id,
        doctorNotes: doctorNotes || "",
        finalVerdict: finalVerdict || "Pending Review",
        reportPdfUrl: reportPdfUrl || ""
    });

    return res.status(201).json(
        new ApiResponse(201, report, "Diagnostic report created successfully.")
    );
});

const getReportById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const report = await DiagnosticReport.findById(id)
        .populate({
        path: "scanId",
        populate: {
            path: "patientId",
            select: "patientName age gender contactNumber"
        }
        })
        .populate("generatedBy", "fullName email specialization role");

    if (!report) {
        throw new ApiError(404, "Diagnostic report not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, report, "Diagnostic report retrieved successfully.")
    );
});

const updateDiagnosticReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { doctorNotes, finalVerdict, reportPdfUrl } = req.body;

    const report = await DiagnosticReport.findByIdAndUpdate(
        id,
        {
        $set: {
            ...(doctorNotes !== undefined && { doctorNotes }),
            ...(finalVerdict && { finalVerdict }),
            ...(reportPdfUrl && { reportPdfUrl })
        }
        },
        { new: true, runValidators: true }
    );

    if (!report) {
        throw new ApiError(404, "Diagnostic report not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, report, "Diagnostic report updated successfully.")
    );
});

const deleteDiagnosticReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await DiagnosticReport.findByIdAndDelete(id);

  if (!report) {
    throw new ApiError(404, "Diagnostic report not found or already deleted.");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Diagnostic report deleted successfully.")
  );
});

export{
    createReport,
    updateDiagnosticReport,
    getReportById,
    deleteDiagnosticReport
}

