import React, { useState, useEffect } from 'react';
import resumeService from '../services/resumeService';
import html2pdf from 'html2pdf.js';

/**
 * Preview Component
 * 
 * BEGINNER EXPLANATION:
 * This component shows the final resume preview and handles saving/loading.
 * It uses React.forwardRef to allow the parent component to access the resume container
 * for printing functionality.
 * 
 * Features:
 * - Live preview of the resume
 * - Save to database functionality
 * - Load existing resume
 * - Auto-save to localStorage as backup
 * - Connection status indicator
 */
const Preview = React.forwardRef(({ data, onPrint }, ref) => {
  // State for managing save/load operations
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [resumeId, setResumeId] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  // Check backend connection when component mounts
  useEffect(() => {
    checkConnection();
    // Auto-save to localStorage every 30 seconds
    const autoSaveInterval = setInterval(() => {
      if (data.name || data.email) {
        resumeService.saveToLocalStorage(data);
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [data]);

  /**
   * Check if backend server is available
   */
  const checkConnection = async () => {
    const health = await resumeService.healthCheck();
    setIsConnected(health.isConnected);
  };

  /**
   * Save resume to database
   */
  const handleSave = async () => {
    if (!data.name || !data.email) {
      setSaveMessage('❌ Name and email are required to save');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      let savedResume;
      
      if (resumeId) {
        // Update existing resume
        savedResume = await resumeService.updateResume(resumeId, data);
        setSaveMessage('✅ Resume updated successfully!');
      } else {
        // Save new resume
        savedResume = await resumeService.saveResume(data);
        setResumeId(savedResume._id);
        setSaveMessage(`✅ Resume saved! ID: ${savedResume._id}`);
      }
      
      // Also save to localStorage as backup
      resumeService.saveToLocalStorage(data);
      
      setTimeout(() => setSaveMessage(''), 5000);
      
    } catch (error) {
      console.error('Save failed:', error);
      setSaveMessage(`❌ Save failed: ${error.message}`);
      
      // Save to localStorage as fallback
      resumeService.saveToLocalStorage(data);
      setSaveMessage(prev => prev + ' (Saved locally as backup)');
      
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Load resume from localStorage backup
   */
  const loadFromBackup = () => {
    const backup = resumeService.loadFromLocalStorage();
    if (backup) {
      // This would need to be implemented in the parent component
      // For now, just show a message
      setSaveMessage('💾 Found local backup! Refresh the page to load it.');
      setTimeout(() => setSaveMessage(''), 5000);
    } else {
      setSaveMessage('❌ No local backup found');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  /**
   * Simple browser print as fallback
   */
  const handleSimplePrint = () => {
    console.log('Simple print called');
    try {
      window.print();
    } catch (error) {
      console.error('Simple print failed:', error);
      setSaveMessage('❌ Print function not available');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  /**
   * Test the onPrint function
   */
  const testPrint = () => {
    console.log('Testing print function...');
    console.log('onPrint type:', typeof onPrint);
    if (typeof onPrint === 'function') {
      try {
        onPrint();
        setSaveMessage('✅ Print function called successfully');
      } catch (error) {
        console.error('Print function error:', error);
        setSaveMessage('❌ Print function failed: ' + error.message);
      }
    } else {
      setSaveMessage('❌ Print function not available');
    }
    setTimeout(() => setSaveMessage(''), 3000);
  };

  /**
   * Download PDF using html2pdf.js library
   * This is a more reliable alternative to react-to-print
   */
  const downloadPDF = async () => {
    console.log('Starting PDF download...');
    setSaveMessage('📄 Generating PDF...');
    
    try {
      // Get the resume container element
      const element = ref.current;
      
      if (!element) {
        throw new Error('Resume element not found');
      }

      // PDF options
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${data.name || 'Resume'}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      // Generate and download PDF
      await html2pdf().set(options).from(element).save();
      
      setSaveMessage('✅ PDF downloaded successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      setSaveMessage('❌ PDF generation failed: ' + error.message);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  return (
    <div className="preview-container">
      {/* Controls sidebar */}
      <div className="preview-controls">
        <h2>👁️ Preview & Export</h2>
        <p>Review your resume and save it or download as PDF.</p>
        
        {/* Connection status */}
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          background: isConnected ? '#d4edda' : '#f8d7da',
          border: `1px solid ${isConnected ? '#c3e6cb' : '#f5c6cb'}`,
          color: isConnected ? '#155724' : '#721c24'
        }}>
          <strong>{isConnected ? '🟢 Connected' : '🔴 Offline'}</strong>
          <br />
          <small>
            {isConnected 
              ? 'Database is available for saving' 
              : 'Using local storage only'
            }
          </small>
        </div>

        {/* Save button */}
        <button 
          onClick={handleSave}
          disabled={isSaving || (!data.name && !data.email)}
          className={`btn ${isSaving ? 'loading' : 'btn-primary'}`}
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          {isSaving ? (
            <span className="loading">
              <span className="spinner"></span>
              Saving...
            </span>
          ) : (
            resumeId ? '💾 Update Resume' : '💾 Save Resume'
          )}
        </button>

        {/* Download PDF buttons */}
        <button 
          onClick={downloadPDF} 
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          📄 Download PDF
        </button>
        
        <button 
          onClick={testPrint} 
          className="btn btn-secondary"
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          🖨️ Print (React-to-Print)
        </button>
        
        <button 
          onClick={handleSimplePrint} 
          className="btn btn-secondary"
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          🖨️ Browser Print
        </button>

        {/* Backup controls */}
        <div style={{ 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
            💾 Local Backup
          </h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#666' }}>
            Your data is automatically saved locally every 30 seconds.
          </p>
          <button 
            onClick={loadFromBackup}
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
          >
            📂 Load Backup
          </button>
        </div>

        {/* Current resume info */}
        {resumeId && (
          <div style={{ 
            padding: '1rem', 
            background: '#e7f3ff', 
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}>
            <strong>Current Resume ID:</strong><br />
            <code style={{ wordBreak: 'break-all' }}>{resumeId}</code>
          </div>
        )}

        {/* Save message */}
        {saveMessage && (
          <div className={saveMessage.startsWith('✅') ? 'success-message' : 'error-message'}>
            {saveMessage}
          </div>
        )}
      </div>

      {/* Resume preview */}
      <div className="resume-preview">
        <div ref={ref} className="resume-container">
          {/* Header */}
          <header className="resume-header">
            <h1 className="resume-name">{data.name || 'Your Name'}</h1>
            <h2 className="resume-title">{data.title || 'Professional Title'}</h2>
            <div className="resume-contact">
              {data.email && <span>📧 {data.email}</span>}
              {data.phone && <span>📞 {data.phone}</span>}
              {data.location && <span>📍 {data.location}</span>}
              {data.website && <span>🌐 {data.website}</span>}
            </div>
          </header>
          
          {/* Summary */}
          {data.summary && (
            <section className="resume-section">
              <h3>Professional Summary</h3>
              <p>{data.summary}</p>
            </section>
          )}
          
          {/* Experience */}
          {data.experiences?.some(exp => exp.company) && (
            <section className="resume-section">
              <h3>Work Experience</h3>
              {data.experiences.map((exp, index) => (
                exp.company && (
                  <div key={index} className="experience-item">
                    <div className="item-header">
                      <div>
                        <div className="company">{exp.company}</div>
                        {exp.position && <div className="position">{exp.position}</div>}
                      </div>
                      {exp.duration && <div className="duration">{exp.duration}</div>}
                    </div>
                    {exp.responsibilities?.some(resp => resp.trim()) && (
                      <div className="responsibilities">
                        <ul>
                          {exp.responsibilities.map((resp, i) => (
                            resp.trim() && <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              ))}
            </section>
          )}
          
          {/* Education */}
          {data.education?.some(edu => edu.institution) && (
            <section className="resume-section">
              <h3>Education</h3>
              {data.education.map((edu, index) => (
                edu.institution && (
                  <div key={index} className="education-item">
                    <div className="item-header">
                      <div>
                        <div className="institution">{edu.institution}</div>
                        {edu.degree && <div className="degree">{edu.degree}</div>}
                      </div>
                      {edu.year && <div className="year">{edu.year}</div>}
                    </div>
                  </div>
                )
              ))}
            </section>
          )}
          
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="resume-section">
              <h3>Skills & Technologies</h3>
              <div className="skills-list">
                {data.skills.map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </section>
          )}
          
          {/* Empty state */}
          {!data.name && !data.email && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#666',
              fontStyle: 'italic'
            }}>
              Start filling out your information to see your resume preview here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Preview;