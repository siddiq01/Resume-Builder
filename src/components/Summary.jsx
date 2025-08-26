import React, { useState } from 'react';

/**
 * Summary Component
 * 
 * BEGINNER EXPLANATION:
 * This component handles the professional summary section.
 * A good summary is 2-3 sentences highlighting your key strengths and experience.
 * 
 * Props:
 * - data: Object containing all resume data
 * - updateData: Function to update the parent component's state
 */
const Summary = ({ data, updateData }) => {
  // Track character count to help users write a good summary
  const [charCount, setCharCount] = useState(data.summary?.length || 0);
  
  /**
   * Handle textarea changes
   * Updates both the character count and the parent component's state
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
    updateData('summary', value);
  };

  // Sample summaries to help beginners
  const sampleSummaries = [
    "Experienced software developer with 3+ years in full-stack development. Proficient in React, Node.js, and cloud technologies. Passionate about creating user-friendly applications that solve real-world problems.",
    "Creative graphic designer with 5+ years of experience in branding and digital design. Skilled in Adobe Creative Suite and modern design principles. Proven track record of delivering impactful visual solutions for diverse clients.",
    "Results-driven marketing professional with expertise in digital marketing strategies. Experienced in SEO, social media management, and content creation. Successfully increased brand engagement by 40% in previous role."
  ];

  const insertSample = (sample) => {
    setCharCount(sample.length);
    updateData('summary', sample);
  };

  return (
    <div className="form-section">
      <h2>📄 Professional Summary</h2>
      <p>
        Write a brief 2-3 sentence summary that highlights your key skills, experience, and what makes you unique. 
        This is the first thing employers will read, so make it count!
      </p>
      
      <div className="form-group">
        <label htmlFor="summary">
          Your Professional Summary 
          <span style={{ 
            float: 'right', 
            fontSize: '0.8rem', 
            color: charCount > 500 ? '#dc3545' : '#666' 
          }}>
            {charCount}/500 characters
          </span>
        </label>
        <textarea 
          id="summary"
          value={data.summary || ''} 
          onChange={handleChange} 
          placeholder="Write a compelling summary that showcases your professional strengths..."
          rows="6"
          maxLength="500"
          style={{
            borderColor: charCount > 500 ? '#dc3545' : undefined
          }}
        />
        {charCount > 500 && (
          <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Summary is too long. Keep it under 500 characters for best results.
          </p>
        )}
      </div>

      {/* Sample summaries for inspiration */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#333' }}>
          Need inspiration? Try these examples:
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sampleSummaries.map((sample, index) => (
            <div 
              key={index}
              style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #e1e5e9',
                position: 'relative'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {sample}
              </p>
              <button
                type="button"
                onClick={() => insertSample(sample)}
                className="btn btn-secondary"
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem'
                }}
              >
                Use This
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#e7f3ff', 
        borderRadius: '8px',
        border: '1px solid #b8e3ff'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0066cc' }}>💡 Pro Tips:</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          <li>Start with your years of experience or current role</li>
          <li>Mention 2-3 key skills or technologies you excel in</li>
          <li>Include a notable achievement or what drives you</li>
          <li>Keep it concise - aim for 2-3 sentences maximum</li>
        </ul>
      </div>
    </div>
  );
};

export default Summary;