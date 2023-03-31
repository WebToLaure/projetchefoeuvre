import react from 'react';
import Home from '../../pages/homePage/home';
import './header.css';

export default function Header(props: any) {

  return (
    <div className='header mt-1 ps-2 pe-2'>
      <div className='headerTitles d-flex flex-column align-items-center text-dark mt-4'>
        <span className="headerTitleSm pt-2 text-center"> Projet Chef D'Oeuvre</span>
        <span className="headerTitleLg pt-5 text-center"> Au delà d'un continent</span>
      </div>
      <img className="headerImage vw-100 px-1" src="/photos/headerPhoto2.jpg" alt="" />
    </div>
  )

}