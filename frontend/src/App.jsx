import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Error from './error';
import LandingPage from './pages/landing_page/LandingPage';
import ProtectedRoute from './component/ProtectedRoute';
import AdminMenu from './pages/admin/menu/AdminMenu';
import AdminArticle from './pages/admin/article/AdminArticle';
import AdminPartner from './pages/admin/partner/AdminPartner';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<Error />} /> 
        <Route path='/admin/menu' exact element={<ProtectedRoute element={<AdminMenu />} />} />
        <Route path='/admin/article' exact element={<ProtectedRoute element={<AdminArticle />} />} />
        <Route path='/admin/partner' exact element={<ProtectedRoute element={<AdminPartner />} />} />
      </Routes>
    </Router>
  );
};

export default App;