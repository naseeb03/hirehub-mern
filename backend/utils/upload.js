import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = async (filePath, folder = 'resumes') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result;
  } catch (error) {
    throw new Error('Error uploading file to Cloudinary: ' + error.message);
  }
};
