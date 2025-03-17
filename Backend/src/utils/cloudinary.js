import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async(localFilePath)=>{
try {
    if(!localFilePath)return null;
    const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);  // Delete file after upload
    }
    return response.secure_url;
} catch (error) {
    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);  // Delete file after upload
    }
    return null;
}
}

export {uploadOnCloudinary};