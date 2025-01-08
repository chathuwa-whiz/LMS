import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const cloudinaryConnection = async () => {
    try {
        const result = await cloudinary.api.ping();
        console.log("Cloudinary connection successful");
    } catch (error) {
        console.error("Cloudinary connection failed:", error.message);        
    }

    // cloudinary.uploader.upload("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", {
    //     folder: "test"
    // })
    // .then(result => {
    //     console.log("Uploaded Image: ", result);
    // })
    // .catch(error => {
    //     console.error("Failed to upload image to Cloudinary:", error.message);
    // });
};

export default cloudinary;