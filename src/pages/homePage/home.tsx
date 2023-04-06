import react from 'react';
import Header from '../../components/header/header';
import SideBar from '../../components/sidebar/sidebar';

import "././home.css";
import ContinentsCards from '../ContinentsCards/continentsCards';


export default function HomePage(props: any, onClick: react.MouseEventHandler<HTMLDivElement> | undefined) {

  return (
    <div >
      <Header />
      <div className='home mt-3'>
        <div className='container vw-100 vh-100'>
          <ContinentsCards />
        </div>
        <div className='sidebar'>
          <SideBar />
        </div>
      </div>
    </div>
  );

}