import {MedicalScan} from "../models/medicalScan.model.js"
import {ApiError} from "../util/apiError.js"
import {ApiResponse} from "../util/apiResponse.js"
import {asyncHandler} from "../util/asyncHandler.js"
import { analyzeMedicalImageWithGemini } from "../services/gemini.service.js"
import { Patient } from "../models/patient.model.js"
import {uploadOnCloudinary} from "../util/cloudinary.js"

// 1. Upload scan image, trigger Gemini analysis, save to Cloudinary & DB
const uploadAndAnalyzeScan = asyncHandler(async(req,res)=>{
    const { patientId, scanType, bodyPart } = req.body;
    const imageLocalPath = req.file?.path;

    if(!scanType){
        throw new ApiError(404,"Scan type is required");
    }

    if(!imageLocalPath){
        throw new ApiError(404,"Medical Image not found");
    }

    if(patientId){
        const patientExists = await Patient.findById(patientId);
        if(!patientExists){
            throw new ApiError(404,"Pateint cannot be found");
        }
    }

    let aiFindings;
    try{
        aiFindings = await analyzeMedicalImageWithGemini(imageLocalPath,req.file.mimetype,scanType);
    }catch(error){
        throw new ApiError(500,"Gemini integration failed, AI Image segmentation not working");
    }


    const cloudinaryResponse = await uploadOnCloudinary(imageLocalPath);
    if (!cloudinaryResponse?.url) {
        throw new ApiError(500, "Failed to upload medical scan image to cloud storage.");
    }

    const medicalScan = await MedicalScan.create({
        patientId: patientId || null,
        uploadedBy: req.user._id,
        scanType,
        bodyPart: bodyPart || "General",
        imageUrl: cloudinaryResponse.url,
        status: "completed",
        analysis: {
            overallFindings: aiFindings.overallFindings,
            severityLevel: aiFindings.severityLevel,
            detectedRegions: aiFindings.detectedRegions || [],
            rawApiResponse: aiFindings
        }
    });

    return res.status(201).json(
        new ApiResponse(201, medicalScan, "Scan analyzed and saved successfully.")
    );
});
// 2. Get scan by ID

const getScanById = asyncHandler(async(req,res)=>{
    const { scanId } = req.params;

    const scan = await MedicalScan.findById(scanId)
        .populate("patientId", "patientName age gender contactNumber")
        .populate("uploadedBy", "fullName email role specialization");

    if (!scan) {
        throw new ApiError(404, "Medical scan not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, scan, "Medical scan details fetched successfully.")
    );
})


// 3. Update doctor feedback & verification on specific bounding box
const verifyDetectedRegion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { regionId, isDoctorVerified, doctorFeedback, clinicalNote } = req.body;

    if (!regionId) {
        throw new ApiError(400, "regionId is required.");
    }

    const scan = await MedicalScan.findById(id);

    if (!scan) {
        throw new ApiError(404, "Medical scan not found.");
    }

    const region = scan.analysis.detectedRegions.id(regionId);
    if (!region) {
        throw new ApiError(404, "Detected region not found on this scan.");
    }

    if (typeof isDoctorVerified === "boolean") {
        region.isDoctorVerified = isDoctorVerified;
    }
    if (doctorFeedback !== undefined) {
        region.doctorFeedback = doctorFeedback;
    }
    if (clinicalNote !== undefined) {
        region.clinicalNote = clinicalNote;
    }

    await scan.save();

    return res.status(200).json(
        new ApiResponse(200, scan, "Region verification updated successfully.")
    );
});
// 4. Delete a scan record
const deleteScan = asyncHandler(async(req,res)=>{
    const {scanId} = req.params

    if(!scanId){
        throw new ApiError(404,"ScanId is required not found");
    }

    const scan = await MedicalScan.findById({_id:scanId,uploadedBy:req.user._id});

    if(!scan){
        throw new ApiError(404,"Medical san cannot be found");
    }

    return res.status(200)
    .json(new ApiResponse(200,null,"Medical Scan deleted"));
})

export {
    uploadAndAnalyzeScan,
    getScanById,
    verifyDetectedRegion,
    deleteScan
}