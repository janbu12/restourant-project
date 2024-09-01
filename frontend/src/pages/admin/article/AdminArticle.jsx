import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../../component/NavbarAdmin';
import ArticleAdmin from '../../../component/ArticleAdmin';
import NavigationHp from '../../../component/NavigationHp';

export default function AdminArticle() {
    
  return (
    <>
        <NavbarAdmin />
        <ArticleAdmin/>
        <NavigationHp/>
        {/* <button onClick={handleLogout} className='button-alert-con'>Logout</button> */}
    </>
  )
}
