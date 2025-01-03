import React, { useState, useEffect } from 'react';

const ResumeModal = ({ show, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    } else {
      alert('Please select a file to upload');
    }
  };

  const handleUploadClick = () => {
    setShowFileInput(true);
  };

  useEffect(() => {
    if (!show) {
      setShowFileInput(false);
      setFile(null);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Apply for Job</h2>
        <p className="mb-4">Would you like to upload a new resume?</p>
        <div className="space-x-4">
          <button
            onClick={handleUploadClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Resume
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
        {showFileInput && (
          <div className="mt-4">
            <input type="file" onChange={handleFileChange} className="mb-2" />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;