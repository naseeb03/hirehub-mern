import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiter: req.user._id,
    });

    return res.status(201).json({
      success: true,
      data: {
        job,  // The job data will be inside the "data" key
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' })
      .populate('recruiter', 'name company')
      .sort('-createdAt');

    return res.status(200).json(jobs); // Directly return the jobs array at the root level
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiter', 'name company');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        job,  // The job details will be inside the "data" key
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job',
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      data: {
        job: updatedJob,  // The updated job will be inside the "data" key
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
