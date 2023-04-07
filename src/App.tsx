import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/navBar/navBar';

import HomePage from './pages/homePage/home';
import Settings from './pages/settings/settings';
import Write from './pages/write/write';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Topics from './pages/topics/topics';
import Topic from './pages/topic/topic';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import ContinentsCards from './pages/ContinentsCards/continentsCards';


function App() {


  return (
    <div className='container-fluid px-0'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />}/>{/* App sera le parent des routes posts et on trouvera la navbar fixe*/}
          {/* <Route index element={<NavBar />} /> */}
         {/*  <Route path='/' element={<ContinentsCards />} /> */}
        {/* </Route> */}
        <Route path="write" element={<Write />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />


        <Route path="/topics" element={<Topics />} /> {/*  permettra de consulter l'ensemble des posts */}
        {/* <Route path="/topics/:id" element={<Topic />} />  */} {/* permmettra de consulter un post par son id  avec boutons éditer et supprimer*/}
        <Route path="topics/delete/:id" element={<Topic />} /> {/* permettra de supprimer un post  */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>



    </div>


  );
}

export default App;
