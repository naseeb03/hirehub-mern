import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob
} from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', protect, authorize('recruiter'), createJob);
router.put('/:id', protect, authorize('recruiter'), updateJob);

export default router;