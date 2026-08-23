import {MedicalScan} from "../models/medicalScan.model.js"
import {ApiError} from "../util/apiError.js"
import {ApiResponse} from "../util/apiResponse.js"
import {asyncHandler} from "../util/asyncHandler.js"
import { analyzeMedicalImageWithGemini } from "../services/gemini.service.js"

// 1. Upload scan image, trigger Gemini analysis, save to Cloudinary & DB
const uploadAndAnalyzeScan = asyncHandler(async(req,res)=>{
    const { patientId, scanType, bodyPart } = req.body;
    const imageLocalPath = req.file?.path;

    
})
// 2. Get scan by ID
// 3. Update doctor feedback & verification on specific bounding box
// 4. Delete a scan record

export {
    uploadAndAnalyzeScan
}