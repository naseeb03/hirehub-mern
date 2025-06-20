import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicantRoutes from './routes/applicant.routes.js';
import recruiterRoutes from './routes/recruiter.routes.js';
import profileRoutes from './routes/profile.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();

// CORS configuration for multiple environments
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000', // Alternative local port
  'https://hirehub-mern.vercel.app', // Production Vercel frontend URL
  'https://hirehub-mern-5d5q.vercel.app', // Production Vercel backend URL
  process.env.CLIENT_URL // Environment variable (if set)
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Server is running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  });
} else {
  // For Vercel serverless
  connectDB().then(() => {
    console.log('Database connected for serverless deployment');
  }).catch(err => {
    console.error('Database connection failed:', err);
  });
}

// Export for Vercel
export default app;