import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowRight, Upload, ChevronDown } from 'lucide-react';

// Enhanced FormField Component with strict name validation
const FormField = ({ label, id, type = 'text', value, onChange, error, required, placeholder }) => {
  const handleChange = (e) => {
    if (id === 'name') {
      const inputValue = e.target.value;
      
      // Allow empty value for editing but validate on submit
      if (inputValue === '') {
        onChange(e);
        return;
      }
      
      // Only allow alphabets, spaces, hyphens, and apostrophes
      if (/^[a-zA-Z\s'-]*$/.test(inputValue)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  // Comprehensive name validation
  const validateName = (name) => {
    if (!name && required) return "Name is required";
    if (!name) return null;
    
    const nameParts = name.trim().split(/\s+/);
    
    if (nameParts.length < 2) return "Please enter both first and last name";
    if (nameParts.some(part => part.length < 2)) return "Each name part should be at least 2 letters";
    if (name.length > 50) return "Name is too long (max 50 characters)";
    if (/[0-9]/.test(name)) return "Numbers are not allowed in names";
    if (/[^a-zA-Z\s'-]/.test(name)) return "Only letters, spaces, hyphens (-) and apostrophes (') allowed";
    if (!/^[a-zA-Z]+(?:\s+[a-zA-Z'-]+)+$/.test(name)) return "Please enter a valid full name";
    
    return null;
  };

  const fieldError = id === 'name' ? validateName(value) || error : error;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={fieldError ? 'input-error' : 'input-normal'}
      />
      {fieldError && <p className="error">{fieldError}</p>}
    </div>
  );
};

// Image Upload Component (unchanged)
const ImageUpload = () => {
  const { formData, updateFormData, formErrors, setError, clearErrors } = useFormContext();
  const fileInput = useRef();

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('image', 'Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateFormData({ image: file, imagePreview: reader.result });
      clearErrors();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload">
      <label>
        Upload Image <span className="required">*</span>
      </label>
      <div
        onClick={() => fileInput.current?.click()}
        className={`upload-area ${
          formData.imagePreview ? 'has-preview' : 
          formErrors.image ? 'has-error' : 'empty'
        }`}
      >
        {formData.imagePreview ? (
          <>
            <img src={formData.imagePreview} alt="Preview" />
            <p>Click to change image</p>
          </>
        ) : (
          <>
            <Upload size={40} />
            <p>Click to upload an image</p>
            <small>PNG, JPG, or GIF (max 5MB)</small>
          </>
        )}
      </div>
      {formErrors.image && <p className="error">{formErrors.image}</p>}
      <input
        type="file"
        ref={fileInput}
        onChange={handleImage}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

// Dropdown Component (unchanged)
const Dropdown = ({ label, options, value, onChange, error, required }) => {
  const [open, setOpen] = useState(false);
  const dropdown = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdown}>
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="dropdown-wrapper">
        <div
          onClick={() => setOpen(!open)}
          className={`dropdown-trigger ${error ? 'error' : ''} ${open ? 'open' : ''}`}
        >
          <span>{value || 'Select an option'}</span>
          <ChevronDown size={20} className={`arrow ${open ? 'open' : ''}`} />
        </div>
        {open && (
          <div className="dropdown-options">
            {options.map(option => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={option === value ? 'selected' : ''}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

// Slider Component (unchanged)
const Slider = ({ label, min, max, value, onChange }) => {
  const [hover, setHover] = useState(false);
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider">
      <div className="slider-header">
        <label>{label}</label>
        <span>{value}</span>
      </div>
      <div 
        className="slider-track"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
          }}
        />
        {hover && (
          <div className="tooltip" style={{ left: `${percent}%` }}>
            {value}
          </div>
        )}
      </div>
      <div className="slider-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

// Main Form Component with updated age categories
const FormPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, validateForm, formErrors } = useFormContext();

  const ageCategories = [
    'Under 18', '18-25', '26-35', 
    '36-45', '46-55', '56-65', '65+'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) navigate('/results');
  };

  return (
    <div className="form">
      <h3>Profile Information</h3>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          error={formErrors.name}
          required
          placeholder="Enter your first and last name"
          style={{ fontStyle: 'italic' }} 
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          error={formErrors.email}
          required
          placeholder="Enter your email address"
          style={{ fontStyle: 'italic' }} 
        />
        <ImageUpload />
        <Dropdown
          label="Age Group"
          options={ageCategories}
          value={formData.category}
          onChange={(value) => updateFormData({ category: value })}
          error={formErrors.category}
          required
        />
        <Slider
          label="Rating"
          min={0}
          max={100}
          value={formData.rating}
          onChange={(value) => updateFormData({ rating: value })}
        />
        <button type="submit">
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};

export { FormPage, FormField, ImageUpload, Dropdown, Slider };