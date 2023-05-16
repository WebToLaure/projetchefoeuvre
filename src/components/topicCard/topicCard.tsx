import './topicCard.css';
import { NavLink } from 'react-router-dom';



type TImg = {
    id: number,
    originalName: string,
    file: string,

}
export default function TopicCard(props: any) {

    
    

    


    return (
        <>
            <NavLink to={`/topic/${props.item.id}`} className="nav-link">
                <div className='d-flex '>
                    <div className="cardTopic mb-5">
                        <img src={`http://localhost:8000/images/${props.item?.images[0]?.file}`} className="cardTopic img-top" alt="photo de voyage"></img> {/* image du topic */}
                        <div className=" d-flex flex-row justify-content-center align-items-center px-1 card-bodyTopic">
                            <span className="card-textTopic fs-4 dark text-center">{props.item?.destinations}</span>
                        </div>
                    </div>
                </div>
            </NavLink >
        </>
    )
}