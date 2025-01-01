import React, { useState } from 'react';

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: ''
    },
    education: [{ school: '', degree: '', field: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: ['']
  });

  const handlePersonalInfoChange = (e) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { school: '', degree: '', field: '', year: '' }]
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { company: '', position: '', duration: '', description: '' }]
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, '']
    });
  };

  const handleEducationChange = (index, e) => {
    const newEducation = resumeData.education.map((edu, i) => {
      if (i === index) {
        return { ...edu, [e.target.name]: e.target.value };
      }
      return edu;
    });
    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleExperienceChange = (index, e) => {
    const newExperience = resumeData.experience.map((exp, i) => {
      if (i === index) {
        return { ...exp, [e.target.name]: e.target.value };
      }
      return exp;
    });
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const handleSkillChange = (index, e) => {
    const newSkills = resumeData.skills.map((skill, i) => {
      if (i === index) {
        return e.target.value;
      }
      return skill;
    });
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resume Data:', resumeData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Resume Builder</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Education
            </button>
          </div>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">School</label>
                <input
                  type="text"
                  name="school"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Field of Study</label>
                <input
                  type="text"
                  name="field"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Experience</h3>
            <button
              type="button"
              onClick={addExperience}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Experience
            </button>
          </div>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="space-y-4 mb-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-2 border rounded-md h-32"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Skills</h3>
            <button
              type="button"
              onClick={addSkill}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Skill
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter a skill"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Generate Resume
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeBuilder;