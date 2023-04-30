import react from 'react';
import Header from '../../components/header/header';
import SideBar from '../../components/sidebar/sidebar';
import "././home.css";
import ContinentsCards from '../../components/ContinentsCards/continentsCards';


export default function HomePage(props: any, onClick: react.MouseEventHandler<HTMLDivElement> | undefined) {

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row m-2">
          <div className="col-md-9 container-card">
            <ContinentsCards/>
          </div>
          <div className="col-md-3 container-card mt-3">
            <SideBar />
          </div>
        </div>

      </div>
    </>
  );

}