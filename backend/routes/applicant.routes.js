import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { handleFileUpload } from '../middleware/upload.js';
import { applyForJob } from '../controllers/application.controller.js';

const router = express.Router();

router.post(
  '/apply/:jobId',
  protect,
  authorize('applicant'),
  handleFileUpload,
  applyForJob
);

export default router;