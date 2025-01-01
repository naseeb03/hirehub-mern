import { uploadToCloudinary } from '../utils/upload.js';

export const handleFileUpload = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const file = req.files.file;

    const result = await uploadToCloudinary(file.tempFilePath);

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: { cloudinaryUrl: result.secure_url },
    });
  } catch (error) {
    next(error);
  }
};
