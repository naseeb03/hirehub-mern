import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function useApplyJob() {
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const applyJob = async (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const handleUploadSuccess = async (data) => {
    setShowModal(false);
    try {
      const token = user?.token;
      if (!token) {
        throw new Error('No token found');
      }
      await axios.post(
        `${import.meta.env.VITE_API_URL}/applicants/apply/${selectedJobId}`,
        { coverLetter: '', resume: data.cloudinaryUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Job applied successfully!');
    } catch (err) {
      console.error('Error applying for job:', err);
      toast.error('Failed to apply for job.');
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      toast.error('Please select a file to upload');
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
      toast.success('File uploaded successfully');
      handleUploadSuccess(response.data.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file.');
    }
  };

  return { applyJob, showModal, setShowModal, handleUpload };
}

export default useApplyJob;