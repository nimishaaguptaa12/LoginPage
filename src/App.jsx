import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { FormPage } from './components/Form';
import ResultsPage from './components/ResultsPAge';

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
          <header className="py-4 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <h1 className="text-xl font-bold text-blue-600">Form Demo</h1>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
            <Routes>
              <Route path="/" element={<FormPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;