import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'remote'],
    required: true
  },
  salary: {
    type: String
  },
  benefits: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  applications: { 
    type: Number, 
    default: 0 
  },
  views: { 
    type: Number, 
    default: 0 
  },
}, 
{
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;