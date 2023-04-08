import react from 'react';
import Home from '../../pages/homePage/home';
import './header.css';

export default function Header(props: any) {

  return (
    <div className='container-fluid vh-50'>
      
        <div className='headerTitles d-flex flex-column align-items-center text-dark mt-4'>
          <span className="headerTitleSm ps-2 pe-2 pt-2 text-center"> Projet Chef D'Oeuvre</span>
          <span className="headerTitleLg ps-2 pe-2 pt-5 text-center"> Au delà d'un continent</span>
       
        <img className="img-fluid headerImage vh-25 vw-100 px-1" src="/photos/headerPhoto2.jpg" alt="" />
      </div>
    </div>
  )

}