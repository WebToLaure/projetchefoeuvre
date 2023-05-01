import { useState, useEffect } from 'react';
import './topicCard.css';
import { NavLink } from 'react-router-dom';



export default function TopicCard(props: any) {

    return (
        <>
            <NavLink to={`/topic/${props.item.id}`} className="nav-link">
                <div className='d-flex '>
                    <div className="cardTopic postion-relative">
                        <img src={`/photos/${props.item.topics}.jpg`} className="cardTopic img-top" alt="..."></img> {/* image du topic */}
                        <div className=" d-flex flex-row justify-content-center align-items-center px-1 card-bodyTopic">
                            <span className="card-textTopic fs-4 dark text-center">{props.item?.destinations}</span>
                        </div>
                    </div>
                </div>
            </NavLink >
        </>
    )
}