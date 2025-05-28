import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowRight, Upload, ChevronDown } from 'lucide-react';
import backgroundImage from '../assets/premium_photo.jpg';
import { submitUser } from '../api'; 

// FormField component
const FormField = ({ label, id, type = 'text', value, onChange, error, required, placeholder }) => {
  const [isTouched, setIsTouched] = useState(false);
  
  const handleChange = (e) => {
    if (!isTouched) setIsTouched(true);
    if (id === 'name') {
      const inputValue = e.target.value;
      if (inputValue === '' || /^[a-zA-Z\s'-]*$/.test(inputValue)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const validateName = (name) => {
    if (!name && required && isTouched) return "Name is required";
    if (!name) return null;

    const nameParts = name.trim().split(/\s+/).filter(part => part.length > 0);
    
    if (nameParts.length < 2) return "Enter first and last name";
    if (nameParts.some(part => part.length < 2)) return "Each name must be 2+ letters";
    if (name.length > 50) return "Name too long";
    if (/[0-9]/.test(name)) return "No numbers allowed";
    if (/[^a-zA-Z\s'-]/.test(name)) return "Only letters, spaces, - and '";
    return null;
  };

  const fieldError = id === 'name' ? validateName(value) : error;
  const showError = fieldError && (isTouched || value);

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          showError ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {showError && <p className="text-red-500 text-xs mt-1">{fieldError}</p>}
    </div>
  );
};

// Image Upload
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
    <div className="mb-5">
      <label className="block text-sm font-medium text-white mb-2">
        Upload Image <span className="text-red-500">*</span>
      </label>
      <div
        onClick={() => fileInput.current?.click()}
        className={`w-full p-5 border-2 border-dashed rounded-xl text-center cursor-pointer transition ${
          formData.imagePreview ? 'border-blue-500 bg-blue-50' : formErrors.image ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {formData.imagePreview ? (
          <>
            <img src={formData.imagePreview} alt="Preview" className="mx-auto h-32 rounded-lg object-cover" />
            <p className="text-xs text-black-500 mt-2">Click to change image</p>
          </>
        ) : (
          <>
            <Upload className="mx-auto text-white mb-2" size={36} />
            <p className="text-sm text-white">Click to upload an image</p>
            <small className="text-white">PNG, JPG or JPEG (max 5MB)</small>
          </>
        )}
      </div>
      {formErrors.image && <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>}
      <input type="file" ref={fileInput} onChange={handleImage} accept="image/*" className="hidden" />
    </div>
  );
};

// Dropdown
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
    <div className="mb-5 relative" ref={dropdown}>
      <label className="block text-sm font-medium text-white mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center px-4 py-2 border rounded-lg cursor-pointer bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <span className={`${!value ? 'text-gray-400' : ''}`}>{value || 'Select an option'}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <div className="absolute mt-2 w-full border rounded-lg bg-white shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer ${
                option === value ? 'bg-blue-50 font-semibold' : ''
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Slider
const Slider = ({ label, min, max, value, onChange }) => {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-white mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none bg-gray-200"
        style={{
          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-white mt-1">
        <span>{min}</span>
        <span className="font-semibold">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

// Main FormPage
const FormPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, validateForm, formErrors } = useFormContext();

  const ageCategories = ['Under 18', '18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await submitUser(formData);
        navigate('/results');
      } catch (error) {
        console.error('Submission failed:', error);
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
      
      {/* Navbar-style header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800">Profile Builder</h1>
          <div className="flex space-x-4">
            <button className="text-Black-700 hover:text-blue-600 transition">Home</button>
            <button className="text-Black-700 hover:text-blue-600 transition">About</button>
            <button className="text-Black-700 hover:text-blue-600 transition">Contact</button>
          </div>
        </div>
      </nav>

      {/* Form container */}
      <div className="w-full max-w-2xl bg-blue backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-0 relative">
        {/* Form header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Profile Information</h2>
          <p className="text-blue-100 text-sm mt-1">Complete your profile details</p>
        </div>
        
        {/* Form body */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <FormField
              label="Name"
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              error={formErrors.name}
              required
              placeholder="Enter your name"
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
            
            <button
              type="submit"
              className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Next</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { FormPage, FormField, ImageUpload, Dropdown, Slider };