/**
 * Resume Service
 * 
 * BEGINNER EXPLANATION:
 * This file handles all API calls to the backend server.
 * It's a centralized place for all database operations like saving and loading resumes.
 * 
 * By keeping API logic separate from components, our code is cleaner and more maintainable.
 */

// Base URL for our API - change this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Generic function to make API requests
 * This handles common tasks like JSON parsing and error handling
 * 
 * @param {string} endpoint - API endpoint to call
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise} - Promise that resolves to the API response
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default options for all requests
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Merge default options with provided options
    const requestOptions = { ...defaultOptions, ...options };
    
    console.log(`🌐 Making API request to: ${url}`);
    
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    console.log('✅ API request successful');
    return data;
    
  } catch (error) {
    console.error('❌ API request failed:', error);
    throw error;
  }
};

/**
 * Resume Service Object
 * Contains all methods for resume-related API operations
 */
const resumeService = {
  
  /**
   * Save a new resume to the database
   * 
   * @param {object} resumeData - Complete resume data object
   * @returns {Promise<object>} - Promise that resolves to the saved resume with ID
   */
  saveResume: async (resumeData) => {
    console.log('💾 Saving resume to database...');
    
    // Validate required fields before sending
    if (!resumeData.name || !resumeData.email) {
      throw new Error('Name and email are required fields');
    }
    
    const response = await apiRequest('/resumes', {
      method: 'POST',
      body: JSON.stringify(resumeData)
    });
    
    console.log('✅ Resume saved successfully with ID:', response.data._id);
    return response.data;
  },

  /**
   * Load a resume by its ID
   * 
   * @param {string} resumeId - MongoDB ObjectId of the resume
   * @returns {Promise<object>} - Promise that resolves to the resume data
   */
  loadResume: async (resumeId) => {
    console.log('📖 Loading resume from database...');
    
    if (!resumeId) {
      throw new Error('Resume ID is required');
    }
    
    const response = await apiRequest(`/resumes/${resumeId}`);
    
    console.log('✅ Resume loaded successfully');
    return response.data;
  },

  /**
   * Update an existing resume
   * 
   * @param {string} resumeId - MongoDB ObjectId of the resume
   * @param {object} resumeData - Updated resume data
   * @returns {Promise<object>} - Promise that resolves to the updated resume
   */
  updateResume: async (resumeId, resumeData) => {
    console.log('📝 Updating resume in database...');
    
    if (!resumeId) {
      throw new Error('Resume ID is required');
    }
    
    const response = await apiRequest(`/resumes/${resumeId}`, {
      method: 'PUT',
      body: JSON.stringify(resumeData)
    });
    
    console.log('✅ Resume updated successfully');
    return response.data;
  },

  /**
   * Get all resumes (basic info only)
   * Useful for creating a resume management dashboard
   * 
   * @returns {Promise<Array>} - Promise that resolves to array of resume summaries
   */
  getAllResumes: async () => {
    console.log('📋 Loading all resumes...');
    
    const response = await apiRequest('/resumes');
    
    console.log(`✅ Loaded ${response.data.length} resumes`);
    return response.data;
  },

  /**
   * Check if the backend server is running
   * Useful for displaying connection status to users
   * 
   * @returns {Promise<object>} - Promise that resolves to health check response
   */
  healthCheck: async () => {
    try {
      const response = await apiRequest('/health');
      console.log('✅ Backend server is running');
      return { isConnected: true, ...response };
    } catch (error) {
      console.log('❌ Backend server is not available');
      return { isConnected: false, error: error.message };
    }
  },

  /**
   * Save resume to localStorage as backup
   * This works even when the backend is not available
   * 
   * @param {object} resumeData - Resume data to save locally
   * @param {string} key - Storage key (optional, defaults to 'resumeBackup')
   */
  saveToLocalStorage: (resumeData, key = 'resumeBackup') => {
    try {
      const dataToSave = {
        ...resumeData,
        lastSaved: new Date().toISOString()
      };
      
      localStorage.setItem(key, JSON.stringify(dataToSave));
      console.log('💾 Resume saved to localStorage as backup');
      
    } catch (error) {
      console.error('❌ Failed to save to localStorage:', error);
    }
  },

  /**
   * Load resume from localStorage
   * 
   * @param {string} key - Storage key (optional, defaults to 'resumeBackup')
   * @returns {object|null} - Resume data or null if not found
   */
  loadFromLocalStorage: (key = 'resumeBackup') => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        console.log('📖 Resume loaded from localStorage');
        return data;
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to load from localStorage:', error);
      return null;
    }
  },

  /**
   * Clear localStorage backup
   * 
   * @param {string} key - Storage key (optional, defaults to 'resumeBackup')
   */
  clearLocalStorage: (key = 'resumeBackup') => {
    try {
      localStorage.removeItem(key);
      console.log('🗑️ localStorage backup cleared');
    } catch (error) {
      console.error('❌ Failed to clear localStorage:', error);
    }
  }
};

// Export the service for use in components
export default resumeService;

/**
 * USAGE EXAMPLES:
 * 
 * // Save a resume
 * const savedResume = await resumeService.saveResume(resumeData);
 * 
 * // Load a resume
 * const resume = await resumeService.loadResume('60a7c8b4f123456789abcdef');
 * 
 * // Update a resume
 * const updated = await resumeService.updateResume('60a7c8b4f123456789abcdef', newData);
 * 
 * // Check backend connection
 * const health = await resumeService.healthCheck();
 * if (health.isConnected) {
 *   console.log('Backend is available');
 * }
 * 
 * // Save backup locally
 * resumeService.saveToLocalStorage(resumeData);
 * 
 * // Load backup
 * const backup = resumeService.loadFromLocalStorage();
 */
