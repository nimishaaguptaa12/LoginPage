import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from 'LoginPage\src\context\FormContext.jsx';
import { FormPage } from 'LoginPage\src\components\Form.jsx';
import ResultsPage from 'LoginPage\src\components\ResultsPage.jsx';

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