/**
 * Resume Builder Backend Server
 * 
 * BEGINNER EXPLANATION:
 * This is a Node.js Express server that handles saving and loading resumes from MongoDB.
 * It provides RESTful API endpoints for the frontend to communicate with the database.
 * 
 * Technologies used:
 * - Express.js: Web framework for Node.js
 * - MongoDB: NoSQL database to store resume data
 * - Mongoose: MongoDB object modeling for Node.js
 * - CORS: Enables cross-origin requests from frontend
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Allow requests from different origins (frontend)
app.use(bodyParser.json({ limit: '10mb' })); // Parse JSON requests with larger limit
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
// For local development, MongoDB should be running on localhost:27017
mongoose.connect('mongodb://localhost:27017/resume-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB successfully');
});

/**
 * Resume Schema Definition
 * This defines the structure of resume documents in MongoDB
 */
const resumeSchema = new mongoose.Schema({
  // Personal Information
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  website: { type: String, trim: true },
  
  // Professional Summary
  summary: { type: String, trim: true },
  
  // Work Experience
  experiences: [{
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    responsibilities: [{ type: String, trim: true }]
  }],
  
  // Education
  education: [{
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true }
  }],
  
  // Skills
  skills: [{ type: String, trim: true }],
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

/**
 * API Routes
 */

// Save a new resume
app.post('/api/resumes', async (req, res) => {
  try {
    console.log('📝 Saving new resume...');
    const resume = new Resume(req.body);
    await resume.save();
    console.log('✅ Resume saved with ID:', resume._id);
    res.status(201).json({
      success: true,
      message: 'Resume saved successfully',
      data: resume
    });
  } catch (error) {
    console.error('❌ Error saving resume:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to save resume',
      error: error.message
    });
  }
});

// Get a specific resume by ID
app.get('/api/resumes/:id', async (req, res) => {
  try {
    console.log('📖 Loading resume with ID:', req.params.id);
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    console.log('✅ Resume loaded successfully');
    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('❌ Error loading resume:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load resume',
      error: error.message
    });
  }
});

// Update an existing resume
app.put('/api/resumes/:id', async (req, res) => {
  try {
    console.log('📝 Updating resume with ID:', req.params.id);
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    console.log('✅ Resume updated successfully');
    res.json({
      success: true,
      message: 'Resume updated successfully',
      data: resume
    });
  } catch (error) {
    console.error('❌ Error updating resume:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update resume',
      error: error.message
    });
  }
});

// Get all resumes (for future features like resume management)
app.get('/api/resumes', async (req, res) => {
  try {
    console.log('📋 Loading all resumes...');
    const resumes = await Resume.find()
      .sort({ updatedAt: -1 })
      .select('name title email createdAt updatedAt');
    
    console.log(`✅ Found ${resumes.length} resumes`);
    res.json({
      success: true,
      data: resumes
    });
  } catch (error) {
    console.error('❌ Error loading resumes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load resumes',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Resume Builder API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Resume Builder Server running on port ${PORT}`);
  console.log(`📖 API Documentation available at http://localhost:${PORT}/api/health`);
  console.log('📝 Make sure MongoDB is running on localhost:27017');
});