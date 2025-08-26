import React from 'react';

/**
 * BasicDetails Component
 * 
 * BEGINNER EXPLANATION:
 * This component handles the basic personal information form.
 * It receives data from the parent component and sends updates back up.
 * 
 * Props:
 * - data: Object containing all resume data
 * - updateData: Function to update the parent component's state
 */
const BasicDetails = ({ data, updateData }) => {
  
  /**
   * Handle input changes
   * When user types in any input field, this function updates the data
   * 
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    // Get the field name and new value from the input
    const { name, value } = e.target;
    
    // Update the parent component's state with new data
    // We spread (...) the existing data and update only the changed field
    updateData(null, {
      ...data,
      [name]: value
    });
  };

  return (
    <div className="form-section">
      <h2>📝 Basic Personal Details</h2>
      <p>Start by filling in your basic contact information. This will appear at the top of your resume.</p>
      
      {/* Using form-row for side-by-side layout on larger screens */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input 
            id="name"
            type="text" 
            name="name" 
            value={data.name || ''} 
            onChange={handleChange} 
            placeholder="e.g., John Smith" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Professional Title *</label>
          <input 
            id="title"
            type="text" 
            name="title" 
            value={data.title || ''} 
            onChange={handleChange} 
            placeholder="e.g., Software Developer" 
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input 
            id="email"
            type="email" 
            name="email" 
            value={data.email || ''} 
            onChange={handleChange} 
            placeholder="john.smith@email.com" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            id="phone"
            type="tel" 
            name="phone" 
            value={data.phone || ''} 
            onChange={handleChange} 
            placeholder="+1 (555) 123-4567" 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
            id="location"
            type="text" 
            name="location" 
            value={data.location || ''} 
            onChange={handleChange} 
            placeholder="New York, NY" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="website">Website/Portfolio</label>
          <input 
            id="website"
            type="url" 
            name="website" 
            value={data.website || ''} 
            onChange={handleChange} 
            placeholder="https://your-portfolio.com" 
          />
        </div>
      </div>
      
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
        * Required fields
      </p>
    </div>
  );
};

export default BasicDetails;