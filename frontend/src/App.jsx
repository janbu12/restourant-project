import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Error from './error';
import LandingPage from './pages/landing_page/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<Error />} /> 
      </Routes>
    </Router>
  );
};

export default App;