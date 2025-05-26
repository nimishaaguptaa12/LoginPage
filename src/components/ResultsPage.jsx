import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowLeft } from 'lucide-react';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="form">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">Personal Information</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Form data on the left side */}
          <div className="flex-1 w-full">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-600 mb-1">Name</h2>
              <p className="text-lg text-gray-800">{formData.name}</p>
            </div>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-600 mb-1">Email</h2>
              <p className="text-lg text-gray-800">{formData.email}</p>
            </div>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-600 mb-1">Age Group</h2>
              <p className="text-lg text-gray-800">{formData.category}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-gray-600 mb-1">Rating</h2>
              <div className="flex items-center gap-4">
                <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-4 bg-blue-500 rounded"
                    style={{ width: `${formData.rating}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-blue-600 font-bold">{formData.rating}</span>
              </div>
            </div>
          </div>
          {/* Image on the right side */}
          {formData.imagePreview && (
            <div className="flex flex-col items-center w-full md:w-1/2">
              <h2 className="font-semibold text-gray-600 mb-2">Uploaded Image</h2>
              <img
                src={formData.imagePreview}
                alt="Uploaded"
                className="rounded-lg shadow-md object-cover mb-2"
                style={{ width: '300px', height: '300px' }}
              />
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-semibold mx-auto"
        >
          <ArrowLeft size={18} />
          <span>Back to Form</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;