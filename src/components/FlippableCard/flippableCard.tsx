
import './flippableCard.css';
import { Card } from '../card/card';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';




export default function FlippableCard() {


    const [showFront, setShowFront] = useState(true);

    return (

        <div className="flip-card-container h-50 w-50 mt-4 px-3">
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames='flip'
            >
                <Card onClick={() => {
                    setShowFront((v) => !v)
                }} />
            </CSSTransition>
        </div>






    )
}
