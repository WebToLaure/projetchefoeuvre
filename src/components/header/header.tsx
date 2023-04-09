import react from 'react';
import Home from '../../pages/homePage/home';
import './header.css';

export default function Header(props: any) {

  return (
    <>
      <div className='headerTitle text-center mt-4 pt-3 d-flex align-items-md-baseline justify-content-center'>
        <span className='title fw-light pt-2'>Au Delà D'un Continent</span>
      </div>

      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/photos/Japon.jpg" className="img-fluid d-block w-100 " alt="photo Japon"></img>
          </div>
          <div className="carousel-item">
            <img src="/photos/chugach-national-forest.jpg" className="img-fluid d-block w-100" alt="photo du chugach-national-forest"></img>
          </div>
          <div className="carousel-item">
            <img src="/photos/Iguane.jpg" className="img-fluid d-block w-100" alt="photo Iguane"></img>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>

  )

}