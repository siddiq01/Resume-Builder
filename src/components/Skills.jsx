import React, { useState } from 'react';

/**
 * Skills Component
 * 
 * BEGINNER EXPLANATION:
 * This component manages a list of skills. Users can add and remove skills.
 * Skills are displayed as tags and are searchable with predefined suggestions.
 * 
 * Props:
 * - data: Object containing all resume data (we use data.skills array)
 * - updateData: Function to update the parent component's state
 */
const Skills = ({ data, updateData }) => {
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Common skills suggestions organized by category
  const skillCategories = {
    "Programming Languages": [
      "JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Rust", "PHP", "Swift", "Kotlin"
    ],
    "Web Development": [
      "React", "Vue.js", "Angular", "Node.js", "Express.js", "HTML5", "CSS3", "SASS", "Bootstrap", "jQuery"
    ],
    "Mobile Development": [
      "React Native", "Flutter", "iOS Development", "Android Development", "Xamarin"
    ],
    "Databases": [
      "MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase", "SQLite", "Oracle"
    ],
    "Cloud & DevOps": [
      "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "Git", "Linux"
    ],
    "Design & Creative": [
      "Adobe Photoshop", "Adobe Illustrator", "Figma", "Sketch", "UI/UX Design", "Graphic Design"
    ],
    "Data Science": [
      "Machine Learning", "Data Analysis", "TensorFlow", "PyTorch", "Pandas", "NumPy", "R"
    ],
    "Soft Skills": [
      "Team Leadership", "Project Management", "Communication", "Problem Solving", "Critical Thinking"
    ]
  };

  /**
   * Add a new skill to the list
   * Prevents duplicates and empty skills
   */
  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    
    if (trimmedSkill !== '' && !data.skills.includes(trimmedSkill)) {
      updateData('skills', [...data.skills, trimmedSkill]);
      setNewSkill('');
      setShowSuggestions(false);
    }
  };

  /**
   * Remove a skill from the list
   * @param {number} index - Index of skill to remove
   */
  const handleRemoveSkill = (index) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    updateData('skills', newSkills);
  };

  /**
   * Add a skill from suggestions
   * @param {string} skill - Skill to add
   */
  const addSuggestion = (skill) => {
    if (!data.skills.includes(skill)) {
      updateData('skills', [...data.skills, skill]);
    }
  };

  /**
   * Handle Enter key press to add skill
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="form-section">
      <h2>🛠️ Skills & Technologies</h2>
      <p>
        Add your technical skills, tools, and technologies. Include both hard skills (programming languages, tools) 
        and soft skills (leadership, communication). Aim for 8-15 relevant skills.
      </p>
      
      <div className="form-group">
        <label htmlFor="skill-input">Add a Skill</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            id="skill-input"
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g., JavaScript, Project Management"
            onKeyPress={handleKeyPress}
            onFocus={() => setShowSuggestions(true)}
            style={{ flex: 1 }}
          />
          <button 
            type="button"
            className="btn btn-primary" 
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
          >
            + Add
          </button>
        </div>
        
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowSuggestions(!showSuggestions)}
          style={{ marginBottom: '1rem' }}
        >
          {showSuggestions ? 'Hide' : 'Show'} Skill Suggestions
        </button>
      </div>

      {/* Current Skills */}
      <div className="skills-container">
        {data.skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            <span>{skill}</span>
            <button 
              type="button"
              className="skill-remove"
              onClick={() => handleRemoveSkill(index)}
              title="Remove skill"
            >
              ×
            </button>
          </div>
        ))}
        {data.skills.length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No skills added yet. Add some skills from the suggestions below or type your own.
          </p>
        )}
      </div>

      {/* Skill Suggestions */}
      {showSuggestions && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#333' }}>
            💡 Popular Skills by Category
          </h3>
          
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ 
                fontSize: '1rem', 
                color: '#667eea', 
                marginBottom: '0.75rem',
                fontWeight: '600'
              }}>
                {category}
              </h4>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSuggestion(skill)}
                    disabled={data.skills.includes(skill)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: '1px solid #e1e5e9',
                      borderRadius: '15px',
                      background: data.skills.includes(skill) ? '#e9ecef' : 'white',
                      color: data.skills.includes(skill) ? '#666' : '#333',
                      fontSize: '0.85rem',
                      cursor: data.skills.includes(skill) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!data.skills.includes(skill)) {
                        e.target.style.background = '#f8f9fa';
                        e.target.style.borderColor = '#667eea';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!data.skills.includes(skill)) {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#e1e5e9';
                      }
                    }}
                  >
                    {data.skills.includes(skill) ? '✓ ' : '+ '}{skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#e7f3ff', 
        borderRadius: '8px',
        border: '1px solid #b8e3ff'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0066cc' }}>💡 Pro Tips:</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          <li>Focus on skills relevant to your target job</li>
          <li>Mix technical skills with soft skills</li>
          <li>Be honest - only include skills you're comfortable discussing</li>
          <li>Keep the list concise (8-15 skills works best)</li>
        </ul>
      </div>
    </div>
  );
};

export default Skills;