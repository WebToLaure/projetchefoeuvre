import './header.css';

export default function Header(props: any) {

  return (
    <>
      <div className="container">
        <div className="row headerTitle text-center mt-4">    
            <p className='col-md-12 fw-light pt-2'>Au delà d'un Continent</p>   
        </div>
      </div>

      <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/photos/Iguane.jpg" className="img-fluid d-block w-100 " alt="photo Japon"></img>
          </div>
          <div className="carousel-item">
            <img src="/photos/Japon.jpg" className="img-fluid d-block w-100" alt="photo du chugach-national-forest"></img>
          </div>
          <div className="carousel-item">
            <img src="/photos/Alpes.jpg" className="img-fluid d-block w-100" alt="photo Iguane"></img>
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