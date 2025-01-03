import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function useApplyJob() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const applyJob = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const handleUploadSuccess = async (data) => {
    console.log('Upload successful:', data);
    setShowModal(false);
    try {
      const token = user?.token;
      if (!token) {
        throw new Error('No token found');
      }
      await axios.post(
        `${import.meta.env.VITE_API_URL}/applicants/apply-job`,
        { jobId: selectedJobId, resumeId: data.resumeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Job applied successfully!');
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Failed to apply for job.');
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = user?.token;
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/applicants/upload-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('File uploaded successfully');
      handleUploadSuccess(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };

  return { applyJob, showModal, setShowModal, handleUpload };
}

export default useApplyJob;