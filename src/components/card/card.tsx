import './card.css';
import './flip-transition.css';


export function Card(props: any) {

    return (
        <div className='card w-50 h-100 ms-2 border-dark bg-light' onClick={props.onClick}>
            <div className='card-front'>Europe</div>
            <div className='card-back'>POSTS</div>
        </div>
    )
}




