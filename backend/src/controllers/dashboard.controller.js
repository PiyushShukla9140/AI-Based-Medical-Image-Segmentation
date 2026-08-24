import mongoose from "mongoose";
import { MedicalScan } from "../models/medicalScan.model.js";
import { Patient } from "../models/patient.model.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";

/**
 * Get Overall Dashboard Statistics for Logged-in Doctor
 * GET /api/v1/dashboard/stats
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
    const doctorId = req.user._id;

    // 1. Total Patients count
    const totalPatients = await Patient.countDocuments({ doctorId });

    // 2. Total Scans count
    const totalScans = await MedicalScan.countDocuments({ uploadedBy: doctorId });

    // 3. Severity Distribution Aggregation
    const severityStats = await MedicalScan.aggregate([
        { $match: { uploadedBy: new mongoose.Types.ObjectId(doctorId) } },
        {
        $group: {
            _id: "$analysis.severityLevel",
            count: { $sum: 1 }
        }
        }
    ]);

    // 4. Modality / Scan Type Distribution
    const scanTypeStats = await MedicalScan.aggregate([
        { $match: { uploadedBy: new mongoose.Types.ObjectId(doctorId) } },
        {
        $group: {
            _id: "$scanType",
            count: { $sum: 1 }
        }
        }
    ]);

    // 5. Recent 5 Scans
    const recentScans = await MedicalScan.find({ uploadedBy: doctorId })
        .populate("patientId", "patientName")
        .sort({ createdAt: -1 })
        .limit(5)
        .select("scanType imageUrl status analysis.severityLevel createdAt");

    return res.status(200).json(
        new ApiResponse(
        200,
        {
            totalPatients,
            totalScans,
            severityStats,
            scanTypeStats,
            recentScans
        },
        "Dashboard statistics fetched successfully."
        )
    );
});