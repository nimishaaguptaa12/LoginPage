import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const defaultFormData = {
  name: '',
  email: '',
  image: null,
  imagePreview: '',
  category: '',
  rating: 50,
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState({});

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const setError = (field, message) => {
    setFormErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearErrors = () => {
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (!formData.image) {
      errors.image = 'Please upload an image';
      isValid = false;
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <FormContext.Provider value={{ formData, formErrors, updateFormData, validateForm, clearErrors, setError }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};