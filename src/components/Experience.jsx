import React from 'react';

/**
 * Experience Component
 * 
 * BEGINNER EXPLANATION:
 * This component manages work experience entries. Users can add multiple jobs,
 * each with multiple responsibilities. It's a dynamic form that grows as needed.
 * 
 * Props:
 * - data: Object containing all resume data (we use data.experiences array)
 * - updateData: Function to update the parent component's state
 */
const Experience = ({ data, updateData }) => {
  
  /**
   * Handle changes to experience fields (company, position, duration)
   * @param {number} index - Index of the experience being edited
   * @param {Event} e - The input change event
   */
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = [...data.experiences];
    newExperiences[index][name] = value;
    updateData('experiences', newExperiences);
  };

  /**
   * Handle changes to responsibility items
   * @param {number} expIndex - Index of the experience
   * @param {number} respIndex - Index of the responsibility
   * @param {Event} e - The input change event
   */
  const handleResponsibilityChange = (expIndex, respIndex, e) => {
    const newExperiences = [...data.experiences];
    newExperiences[expIndex].responsibilities[respIndex] = e.target.value;
    updateData('experiences', newExperiences);
  };

  /**
   * Add a new experience entry
   */
  const addExperience = () => {
    updateData('experiences', [
      ...data.experiences,
      {
        company: '',
        position: '',
        duration: '',
        responsibilities: ['']
      }
    ]);
  };

  /**
   * Add a new responsibility to a specific experience
   * @param {number} index - Index of the experience
   */
  const addResponsibility = (index) => {
    const newExperiences = [...data.experiences];
    newExperiences[index].responsibilities.push('');
    updateData('experiences', newExperiences);
  };

  /**
   * Remove an experience entry
   * @param {number} index - Index of the experience to remove
   */
  const removeExperience = (index) => {
    if (data.experiences.length > 1) {
      const newExperiences = data.experiences.filter((_, i) => i !== index);
      updateData('experiences', newExperiences);
    }
  };

  /**
   * Remove a responsibility from an experience
   * @param {number} expIndex - Index of the experience
   * @param {number} respIndex - Index of the responsibility to remove
   */
  const removeResponsibility = (expIndex, respIndex) => {
    const newExperiences = [...data.experiences];
    if (newExperiences[expIndex].responsibilities.length > 1) {
      newExperiences[expIndex].responsibilities = newExperiences[expIndex].responsibilities.filter((_, i) => i !== respIndex);
      updateData('experiences', newExperiences);
    }
  };

  return (
    <div className="form-section">
      <h2>💼 Work Experience</h2>
      <p>
        Add your work history starting with your most recent position. Include key achievements 
        and responsibilities that showcase your skills and impact.
      </p>
      
      <div className="dynamic-list">
        {data.experiences.map((exp, expIndex) => (
          <div key={expIndex} className="list-item">
            {data.experiences.length > 1 && (
              <button 
                type="button"
                className="remove-btn"
                onClick={() => removeExperience(expIndex)}
                title="Remove this experience"
              >
                ×
              </button>
            )}
            
            <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Experience {expIndex + 1}
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`company-${expIndex}`}>Company Name *</label>
                <input
                  id={`company-${expIndex}`}
                  type="text"
                  name="company"
                  value={exp.company || ''}
                  onChange={(e) => handleExperienceChange(expIndex, e)}
                  placeholder="e.g., Google, Microsoft, Startup Inc."
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor={`position-${expIndex}`}>Job Title *</label>
                <input
                  id={`position-${expIndex}`}
                  type="text"
                  name="position"
                  value={exp.position || ''}
                  onChange={(e) => handleExperienceChange(expIndex, e)}
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`duration-${expIndex}`}>Duration *</label>
              <input
                id={`duration-${expIndex}`}
                type="text"
                name="duration"
                value={exp.duration || ''}
                onChange={(e) => handleExperienceChange(expIndex, e)}
                placeholder="e.g., Jan 2020 - Present, Jun 2018 - Dec 2019"
                required
              />
            </div>

            <div className="form-group">
              <label>Key Responsibilities & Achievements</label>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                Use bullet points to describe your main responsibilities and achievements. Start with action verbs.
              </p>
              
              {exp.responsibilities.map((resp, respIndex) => (
                <div key={respIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={resp || ''}
                    onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e)}
                    placeholder="e.g., Developed and maintained web applications using React and Node.js"
                    style={{ flex: 1 }}
                  />
                  {exp.responsibilities.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeResponsibility(expIndex, respIndex)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem', minWidth: 'auto' }}
                      title="Remove this responsibility"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              
              <button 
                type="button"
                className="btn btn-secondary add-btn"
                onClick={() => addResponsibility(expIndex)}
              >
                + Add Responsibility
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        type="button"
        className="btn btn-primary add-btn" 
        onClick={addExperience}
      >
        + Add Another Experience
      </button>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#e7f3ff', 
        borderRadius: '8px',
        border: '1px solid #b8e3ff'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0066cc' }}>💡 Pro Tips:</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          <li>Start each responsibility with an action verb (developed, managed, led, improved)</li>
          <li>Include specific numbers and results when possible (increased sales by 25%)</li>
          <li>Focus on achievements rather than just duties</li>
          <li>List experiences in reverse chronological order (most recent first)</li>
        </ul>
      </div>
    </div>
  );
};

export default Experience;