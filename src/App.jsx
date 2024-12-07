import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ApplicantDashboard from './pages/applicant/Dashboard';
import RecruiterDashboard from './pages/recruiter/Dashboard';
import JobSearch from './pages/applicant/JobSearch';
import PostJob from './pages/recruiter/PostJob';
import Profile from './pages/Profile';
import ResumeBuilder from './pages/applicant/ResumeBuilder';
import Applications from './pages/recruiter/Applications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="applicant">
            <Route path="dashboard" element={<ApplicantDashboard />} />
            <Route path="jobs" element={<JobSearch />} />
            <Route path="resume-builder" element={<ResumeBuilder />} />
          </Route>
          
          <Route path="recruiter">
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="applications" element={<Applications />} />
          </Route>
          
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;