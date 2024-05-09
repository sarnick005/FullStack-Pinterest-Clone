import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImageFromCloudinary = (imageUrl) => {
  if (!imageUrl) return; 
  const publicId = extractPublicIdFromUrl(imageUrl);
  if (!publicId) return; 

  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.error(`Error deleting image from Cloudinary: ${error.message}`);
    } else {
      console.log(`Deleted image from Cloudinary: ${publicId}`);
    }
  });
};

const extractPublicIdFromUrl = (url) => {
  const matches = url.match(/\/([^/]+?)$/);
  return matches ? matches[1].split(".")[0] : null;
};

