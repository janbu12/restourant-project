import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Error from './error';
import LandingPage from './pages/landing_page/LandingPage';
import ProtectedRoute from './component/ProtectedRoute';
import Admin from './pages/admin/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<Error />} /> 
        <Route path='/admin' exact element={<ProtectedRoute element={<Admin />} />} />
      </Routes>
    </Router>
  );
};

export default App;