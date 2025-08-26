import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// Import all our component files
import BasicDetails from './components/BasicDetails';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Preview from './components/Preview';
import './App.css';

/**
 * Main App Component
 * This is the root component that manages the entire resume builder application
 * 
 * BEGINNER EXPLANATION:
 * - useState: React hook that lets us store and update data
 * - useRef: React hook that gives us direct access to DOM elements
 * - Components: Reusable pieces of UI that we import and use
 */
function App() {
  // State to store all resume information
  // This object holds all the data that will appear on the resume
  const [resumeData, setResumeData] = useState({
    // Personal information
    name: '',
    title: '',
    phone: '',
    email: '',
    location: '',
    website: '',
    
    // Professional summary
    summary: '',
    
    // Work experience (array of objects)
    experiences: [{
      company: '',
      position: '',
      duration: '',
      responsibilities: ['']
    }],
    
    // Education background (array of objects)
    education: [{
      institution: '',
      degree: '',
      year: ''
    }],
    
    // Skills list (array of strings)
    skills: []
  });

  // Track which section is currently being edited
  const [activeSection, setActiveSection] = useState('basic');
  
  // Reference to the resume preview for printing
  const resumeRef = useRef();

  // Function to handle printing the resume
  // This uses the react-to-print library to create a PDF
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current, // What to print (our resume preview)
    documentTitle: `${resumeData.name || 'Resume'}_Resume`,
    onBeforeGetContent: () => {
      console.log('Preparing to print...');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('Print dialog closed');
    },
    onPrintError: (errorLocation, error) => {
      console.error('Print error:', errorLocation, error);
    },
    pageStyle: `
      @page { 
        size: A4; 
        margin: 0.5in; 
      }
      @media print { 
        body { 
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .resume-container { 
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
          width: 100% !important;
          max-width: none !important;
        }
      }
    `
  });

  /**
   * Function to update resume data
   * This is passed to child components so they can update the main state
   * 
   * @param {string|null} section - Which section of data to update (e.g., 'skills') or null for direct merge
   * @param {any} data - The new data for that section or object to merge
   */
  const updateResumeData = (section, data) => {
    if (section === null) {
      // Direct merge for basic details (name, email, etc.)
      setResumeData(prev => ({
        ...prev,  // Keep all existing data
        ...data   // Merge the new data directly
      }));
    } else {
      // Update specific section (skills, experiences, etc.)
      setResumeData(prev => ({
        ...prev,        // Keep all existing data
        [section]: data // Update only the specified section
      }));
    }
  };

  /**
   * Function to render the appropriate component based on active section
   * This is like a router - it shows different forms based on what's selected
   */
  const renderSection = () => {
    switch(activeSection) {
      case 'basic': 
        return <BasicDetails data={resumeData} updateData={updateResumeData} />;
      case 'summary': 
        return <Summary data={resumeData} updateData={updateResumeData} />;
      case 'experience': 
        return <Experience data={resumeData} updateData={updateResumeData} />;
      case 'education': 
        return <Education data={resumeData} updateData={updateResumeData} />;
      case 'skills': 
        return <Skills data={resumeData} updateData={updateResumeData} />;
      case 'preview': 
        return <Preview data={resumeData} ref={resumeRef} onPrint={handlePrint} />;
      default: 
        return <BasicDetails data={resumeData} updateData={updateResumeData} />;
    }
  };

  // The JSX that renders our app's user interface
  return (
    <div className="app">
      {/* Header section with the app title */}
      <header className="app-header">
        <h1>Professional Resume Builder</h1>
      </header>
      
      <div className="app-container">
        {/* Navigation sidebar with section buttons */}
        <nav className="sidebar">
          <button 
            className={activeSection === 'basic' ? 'active' : ''}
            onClick={() => setActiveSection('basic')}
          >
            📝 Basic Details
          </button>
          <button 
            className={activeSection === 'summary' ? 'active' : ''}
            onClick={() => setActiveSection('summary')}
          >
            📄 Summary
          </button>
          <button 
            className={activeSection === 'experience' ? 'active' : ''}
            onClick={() => setActiveSection('experience')}
          >
            💼 Experience
          </button>
          <button 
            className={activeSection === 'education' ? 'active' : ''}
            onClick={() => setActiveSection('education')}
          >
            🎓 Education
          </button>
          <button 
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={() => setActiveSection('skills')}
          >
            🛠️ Skills
          </button>
          <button 
            className={activeSection === 'preview' ? 'active' : ''}
            onClick={() => setActiveSection('preview')}
          >
            👁️ Preview & Download
          </button>
        </nav>
        
        {/* Main content area where forms are displayed */}
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;