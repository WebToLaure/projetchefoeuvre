import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

import NavBar from './components/navBar/navBar';
import HomePage from './pages/homePage/home';
import Single from './pages/single/single';
import SideBar from './components/sidebar/sidebar';
import Settings from './pages/settings/settings';
import Write from './pages/write/write';
import Login from './pages/login/login';
import Register from './pages/register/register';


function App() {


  return (
    <div className='container-fluid px-2'>
      <NavBar />
      <SideBar />
      
      <Outlet />

      <HomePage />
      <Register/>
      <Login/>
      {/*  <Single/>
      <Write/> */}
      {/* <Settings/>  */}


    </div>


  );
}

export default App;
