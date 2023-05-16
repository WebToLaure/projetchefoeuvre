import './continentCard.css';
import { NavLink } from 'react-router-dom';



export default function ContinentCard(props: any) {

    return (
        <>
            <NavLink to={`/topicsCards/${props.item.id}`} className="nav-link">
                <div className='d-flex '>
                    <div className="card">
                        <img src={`/photos/${props.item.continent}.jpg`} className="card-img-top" alt="photo des conitnents"></img>
                        <div className="card-body">
                            <p className="card-text fs-2 dark text-center">{props.item?.continent}</p>
                        </div>
                    </div>
                </div >
            </NavLink>
        </>
    )
}