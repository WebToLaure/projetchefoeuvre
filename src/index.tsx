import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import './index.css';
import NavBar from './components/navBar/navBar';
import Posts from './components/posts/posts';
import Post from './components/post/post';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import Login from './pages/login/login';
import Register from './pages/register/register';
import HomePage from './pages/homePage/home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> {/* App sera le parent des routes posts et on trouvera la navbar fixe*/}
          <Route index element={<NavBar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} /> {/*  permettra de consulter l'ensemble des posts */}
          <Route path="/post/:id" element={<Post />} />  {/* permmettra de consulter un post par son id  avec boutons éditer et supprimer*/}
          <Route path="post/new" element={<Post />} />   {/*  permettra de créer un post avec le bouton Write*/}
          <Route path="post/delete" element={<Post />} /> {/* permettra de supprimer un post  */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
