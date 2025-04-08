import { axiosInstance } from "./axios";

export const loginUser = async (data) => {
  try {
    const res = await axiosInstance.post('/auth/login', {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axiosInstance.post('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getJobs = async () => {
  try {
    const res = await axiosInstance.get('/jobs/');
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getSavedJobs = async (user) => {
  try {
    const res = await axiosInstance.get('/applicants/saved-jobs', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const saveJob = async (user, jobId) => {
  try {
    const res = await axiosInstance.post('/applicants/save-job',
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getUserApplications = async (user) => {
  try {
    const res = await axiosInstance.get(`/applicants/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getResume = async (user) => {
  try {
    const res = await axiosInstance.get('/resume', 
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const saveResume = async (user, resumeData) => {
  try {
    const res = await axiosInstance.post('/resume',
      resumeData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const unsaveJob = async (user, jobId) => {
  try {
    const res = await axiosInstance.post('/applicants/unsave-job',
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getRecruiterApplications = async (user) => {
  try {
    const res = await axiosInstance.get(`/recruiters/recruiter/${user.id}`, 
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getUserJobs = async (user) => {
  try {
    const res = await axiosInstance.get(`/jobs/${user.id}/jobs`, 
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getProfile = async (user) => {
  try {
    const res = await axiosInstance.get('/profile', 
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updateProfile = async (user, formData) => {
  try {
    const res = await axiosInstance.put('/profile',
      formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const putJob = async (user, jobData) => {
  try {
    const res = await axiosInstance.post('/jobs/', 
      jobData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const applyToJob = async (user, formData, jobId) => {
  try {
    const res = await axiosInstance.post(`/applicants/apply/${jobId}`,
      formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    await axiosInstance.post(`/jobs/${jobId}/increment-applications`, {}, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updateJob = async (user, jobId, jobData) => {
  try {
    const res = await axiosInstance.put(`/jobs/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getJobById = async (jobId, user) => {
  try {
    const res = await axiosInstance.get(`/jobs/${jobId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updateApplication = async (user, applicationId, status) => {
  try {
    const res = await axiosInstance.put(`/recruiters/applications/${applicationId}/status`, 
      { status }, // Ensure status is sent as an object
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
    );
    return res.data; // Ensure the function returns the response data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error updating application status'); // Properly handle and throw the error
  }
}