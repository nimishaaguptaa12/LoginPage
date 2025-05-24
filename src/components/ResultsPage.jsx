import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowLeft } from 'lucide-react';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  return (
    <div className="results-container">
      <h1 className="results-title">Personal Information</h1>
      
      <div className="results-content">
        {/* Image on the left side */}
        {formData.imagePreview && (
          <div className="image-section">
            <h2 className="result-label">Uploaded Image</h2>
            <img
            src={formData.imagePreview}
            alt="Uploaded"
            className="uploaded-image"
            style={{ width: '400px', height: '400px', objectFit: 'cover' }}
            />
            <div className="image-wrapper">
              {/* <img 
                src={formData.imagePreview} 
                alt="Uploaded" 
                className="uploaded-image" 
              /> */}
            </div>
          </div>
        )}

        {/* Form data on the right side */}
        <div className="results-data">
          <div className="result-item">
            <h2 className="result-label">Name</h2>
            <p className="result-value">{formData.name}</p>
          </div>
          
          <div className="result-item">
            <h2 className="result-label">Email</h2>
            <p className="result-value">{formData.email}</p>
          </div>
          
          <div className="result-item">
            <h2 className="result-label">Age Group</h2>
            <p className="result-value">{formData.category}</p>
          </div>
          
          <div className="result-item">
            <h2 className="result-label">Rating</h2>
            <div className="rating-display">
              <div className="rating-bar">
                <div 
                  className="rating-progress" 
                  style={{ width: `${formData.rating}%` }}
                ></div>
              </div>
              <span className="rating-value">{formData.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="back-button"
      >
        <ArrowLeft size={18} />
        <span>Back to Form</span>
      </button>
    </div>
  );
};

export default ResultsPage;
