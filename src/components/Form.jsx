import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowRight, Upload, ChevronDown } from 'lucide-react';

// Basic Input Component
const FormField = ({ label, id, type = 'text', value, onChange, error, required, placeholder }) => (
  <div className="form-field">
    <label htmlFor={id}>
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'input-error' : 'input-normal'}
    />
    {error && <p className="error">{error}</p>}
  </div>
);

// Image Upload Component
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

// Dropdown Component
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

// Slider Component
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

// Main Form Component
const FormPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, validateForm, formErrors } = useFormContext();

  const categories = [
    'Technology', 'Business', 'Education', 
    'Entertainment', 'Health', 'Sports', 
    'Travel', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) navigate('/results');
  };

  return (
    <div className="form">
      <h1>Profile Information</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          error={formErrors.name}
          required
          placeholder="Enter your full name"
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
        />
        <ImageUpload />
        <Dropdown
          label="Category"
          options={categories}
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