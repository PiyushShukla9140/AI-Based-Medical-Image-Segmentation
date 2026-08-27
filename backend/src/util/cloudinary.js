import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import {ApiError} from "./apiError.js"



//Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    
});




export const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath){
            throw new ApiError(404,"File not found on local server");
        }


        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        
        })

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }


        
        return response

    }catch(error){
        
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        } 
        console.error("Cloudinary upload error: ",error);
        return null;
    }
}


export const deleteFromCloudinary = async(cloudinaryURL)=>{
    try{
        if(!cloudinaryURL) return null

        const publicIDwithExtension =  cloudinaryURL.split("/").pop();

        const publicId = publicIDwithExtension.split(".")[0]

        const response = await cloudinary.uploader.destroy(publicId)
        if(response?.result !== "ok"){
            throw new ApiError(500, "Failed to delete image")
        }
        return response
    }catch(error){
        console.error("Error while deleting the file from cloudinary")
        return null
    }
}
