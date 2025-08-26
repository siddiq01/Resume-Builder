import React from 'react';

/**
 * Education Component
 * 
 * BEGINNER EXPLANATION:
 * This component manages education entries. Users can add multiple degrees,
 * certifications, or educational achievements.
 * 
 * Props:
 * - data: Object containing all resume data (we use data.education array)
 * - updateData: Function to update the parent component's state
 */
const Education = ({ data, updateData }) => {
  
  /**
   * Handle changes to education fields
   * @param {number} index - Index of the education entry being edited
   * @param {Event} e - The input change event
   */
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...data.education];
    newEducation[index][name] = value;
    updateData('education', newEducation);
  };

  /**
   * Add a new education entry
   */
  const addEducation = () => {
    updateData('education', [
      ...data.education,
      {
        institution: '',
        degree: '',
        year: ''
      }
    ]);
  };

  /**
   * Remove an education entry
   * @param {number} index - Index of the education to remove
   */
  const removeEducation = (index) => {
    if (data.education.length > 1) {
      const newEducation = data.education.filter((_, i) => i !== index);
      updateData('education', newEducation);
    }
  };

  return (
    <div className="form-section">
      <h2>🎓 Education</h2>
      <p>
        Add your educational background including degrees, certifications, and relevant coursework. 
        List in reverse chronological order (most recent first).
      </p>
      
      <div className="dynamic-list">
        {data.education.map((edu, index) => (
          <div key={index} className="list-item">
            {data.education.length > 1 && (
              <button 
                type="button"
                className="remove-btn"
                onClick={() => removeEducation(index)}
                title="Remove this education entry"
              >
                ×
              </button>
            )}
            
            <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Education {index + 1}
            </h3>

            <div className="form-group">
              <label htmlFor={`institution-${index}`}>Institution/School Name *</label>
              <input
                id={`institution-${index}`}
                type="text"
                name="institution"
                value={edu.institution || ''}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g., Harvard University, MIT, Stanford"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`degree-${index}`}>Degree/Program *</label>
                <input
                  id={`degree-${index}`}
                  type="text"
                  name="degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor={`year-${index}`}>Year/Duration *</label>
                <input
                  id={`year-${index}`}
                  type="text"
                  name="year"
                  value={edu.year || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., 2018-2022, Class of 2022"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        type="button"
        className="btn btn-primary add-btn" 
        onClick={addEducation}
      >
        + Add Another Education
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
          <li>Include your highest degree first, then work backwards</li>
          <li>Mention relevant coursework, projects, or achievements if applicable</li>
          <li>Include certifications, bootcamps, or online courses if relevant</li>
          <li>You can add GPA if it's 3.5 or higher</li>
        </ul>
      </div>
    </div>
  );
};

export default Education;
