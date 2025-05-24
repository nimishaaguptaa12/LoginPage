import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ArrowLeft } from 'lucide-react';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Submission Results</h1>
      
      {formData.imagePreview && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Uploaded Image</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <img 
              src={formData.imagePreview} 
              alt="Uploaded" 
              className="w-full h-auto rounded shadow-sm" 
            />
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Name</h2>
          <p className="text-gray-900 font-medium">{formData.name}</p>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
          <p className="text-gray-900 font-medium">{formData.email}</p>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Category</h2>
          <p className="text-gray-900 font-medium">{formData.category}</p>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Rating</h2>
          <div className="flex items-center gap-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${formData.rating}%` }}
              ></div>
            </div>
            <span className="text-blue-600 font-medium">{formData.rating}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 mt-6"
      >
        <ArrowLeft size={18} />
        <span>Back to Form</span>
      </button>
    </div>
  );
};

export default ResultsPage;