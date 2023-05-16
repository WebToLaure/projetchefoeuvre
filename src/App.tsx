import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar/navBar';

import HomePage from './pages/homePage/home';
import Settings from './pages/settings/settings';
import Write from './pages/write/write';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Topic from './pages/topic/topic';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import ContinentsCards from './components/ContinentsCards/continentsCards';
import { AuthContext, TUser } from './context/authContext';
import TopicsCards from './components/topicsCards/topicsCards';
import Contact from './pages/contact/contact';
import UserTopics from './pages/MyTopics/userTopics';
import MonCompte from './components/User/MonCompte';


function App() {
  const [user, setUser] = useState<TUser | null>(null);


  return (
    <AuthContext.Provider value={{
      user: user,
      setUser: setUser
    }}>
      <>
        <NavBar />
        <Routes>
        
          <Route path="/" element={<HomePage />} />{/* App sera le parent des routes posts et on trouvera la navbar fixe*/}
          <Route path="write" element={<Write />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/userSettings" element={<Settings />} />
          <Route path="/userCardsTopics/" element={<UserTopics />} />
          <Route path="/userAccount/" element={<MonCompte />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/continents" element={<ContinentsCards />} /> {/*  permettra de consulter l'ensemble des posts */}
          <Route path="/topicsCards/:id" element={<TopicsCards />} />
          <Route path="/topic/:id" element={<Topic />} />
          <Route path="topics/delete/:id" element={<Topic />} /> {/* permettra de supprimer un post  */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer theme="dark" closeOnClick/>
      </>
    </AuthContext.Provider>
  );
}

export default App;
