import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { FormPage } from './components/Form';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
          </header>
          
          <main className="app-main">
            <div class="bg-[url(/img/mountains.jpg)] ...">
              <div class="backdrop-blur-xs backdrop-grayscale ..."></div>
            </div>
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