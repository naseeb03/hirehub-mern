import { uploadToCloudinary } from '../utils/upload.js';

export const handleFileUpload = async (req, res, next) => {
  try {
    // Check if a file is uploaded
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const file = req.files.file;

    // Upload to Cloudinary using file.tempFilePath
    const result = await uploadToCloudinary(file.tempFilePath);

    // Respond with the Cloudinary URL
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: { cloudinaryUrl: result.secure_url },
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
