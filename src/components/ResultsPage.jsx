import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowLeft } from 'lucide-react';
import backgroundImage from '../assets/premium_photo.jpg';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-8 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 backdrop-blur-sm"></div>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800">Profile Builder</h1>
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition">Home</button>
            <button className="text-gray-700 hover:text-blue-600 transition">About</button>
            <button className="text-gray-700 hover:text-blue-600 transition">Contact</button>
          </div>
        </div>
      </nav>

      {/* Main content container */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-0 relative mt-12 mb-8">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Personal Information</h1>
        </div>
        
        {/* Content area */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Form data on the left side */}
            <div className="flex-1 w-full space-y-6">
              <div className="pb-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-600 mb-1">Name</h2>
                <p className="text-lg text-gray-800">{formData.name || 'Not provided'}</p>
              </div>
              
              <div className="pb-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-600 mb-1">Email</h2>
                <p className="text-lg text-gray-800">{formData.email || 'Not provided'}</p>
              </div>
              
              <div className="pb-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-600 mb-1">Age Group</h2>
                <p className="text-lg text-gray-800">{formData.category || 'Not selected'}</p>
              </div>
              
              <div>
                <h2 className="font-semibold text-gray-600 mb-1">Rating</h2>
                <p className="text-lg text-gray-800">
                  {formData.rating || 0}
              </div>
            </div>

            {/* Image on the right side */}
            {formData.imagePreview && (
              <div className="w-full md:w-auto flex flex-col items-center">
                <h2 className="font-semibold text-gray-600 mb-4">Uploaded Image</h2>
                <div className="p-1 border-4 border-blue-100 rounded-full bg-balck shadow-md">
                  <img
                    src={formData.imagePreview}
                    alt="Uploaded preview"
                    className="rounded-full object-cover w-50 h-50 md:w-48 md:h-48"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Back button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <ArrowLeft size={18} />
              <span>Back to Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;