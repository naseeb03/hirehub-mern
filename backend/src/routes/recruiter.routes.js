import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { 
  getApplications, 
  updateApplicationStatus, 
  getRecruiterApplications, 
  getRecruiterJobs
} from '../controllers/application.controller.js';
import { applicationStatusValidator } from '../validators/application.validator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get(
  '/applications', 
  protect, 
  authorize('recruiter'), 
  getApplications
);

router.put(
  '/applications/:id/status',
  protect,
  authorize('recruiter'),
  // applicationStatusValidator,
  // validate,
  updateApplicationStatus
);

router.get(
  '/recruiter/:jobId',
  protect,
  authorize('recruiter'),
  getRecruiterApplications
);

router.get('/recruiter/jobs/:recruiterId',
  protect,
  authorize('recruiter'),
  getRecruiterJobs
);

export default router;