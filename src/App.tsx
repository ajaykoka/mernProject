import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/Registerform';
import SignInForm from './components/SignInForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
