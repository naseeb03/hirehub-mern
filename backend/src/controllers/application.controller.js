import Application from '../models/Application.js';
import Job from '../models/Job.js';
import asyncHandler from '../middleware/async.js';
import { sendMail } from '../config/nodemailer.js';

export const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job || job.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Job not found or is closed',
      });
    }

    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'Already applied for this job',
      });
    }

    let resumeUrl = null;
    if (req.file && req.file.cloudinaryUrl) {
      resumeUrl = req.file.cloudinaryUrl;
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      resume: resumeUrl,
      coverLetter: req.body.coverLetter,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job').populate('applicant');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application',
      });
    }

    application.status = req.body.status;
    await application.save();

    if (req.body.status === 'shortlisted') {
      const applicantEmail = application.applicant.email;
      console.log(applicantEmail)
      const subject = 'Congratulations! You have been shortlisted';
      const text = `Dear ${application.applicant.name},\n\nCongratulations! You have been shortlisted for the position of ${application.job.title}. We will contact you soon with further details.\n\nBest regards,\n${application.job.company}`;

      await sendMail(applicantEmail, subject, text);
    }

    return res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplications = asyncHandler(async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job')
      .populate('applicant', 'name email')
      .sort('-createdAt');

    return res.status(200).json({
      success: true,
      message: 'Applications retrieved successfully',
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const getUserApplications = asyncHandler(async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.params.userId })
      .populate('job')
      .populate('applicant', 'name email')
      .sort('-createdAt');

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const getRecruiterApplications = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.params.recruiterId }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job')
      .populate('applicant', 'name email')
      .sort('-createdAt');

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});