import react from 'react';
import Header from '../../components/header/header';
import Posts from '../../components/posts/posts';
import SideBar from '../../components/sidebar/sidebar';
import Settings from '../settings/settings';
import "././home.css";

export default function HomePage(props: any, onClick: react.MouseEventHandler<HTMLDivElement> | undefined) {

  return (
    <div >
      <Header />
      <div className='home'>
        <Posts />
        <SideBar/>
        

        {/* <Settings/> */}
      </div>
    </div>
  );

}