import react from 'react';
import { NavLink} from "react-router-dom";
import "././settings.css";

export default function Settings(props: any, onClick: react.MouseEventHandler<HTMLDivElement> | undefined) {




    return (
        <div className="container-fluid bg-light mt-2">
            <h3 className="mt-5 pt-4 text-center mb-4 ">BIENVENUE SUR VOTRE TABLEAU DE BORD</h3>
            <ul className="navbar-nav w-100">
                <li className="nav-item mt-4 mb-4">
                    <NavLink to="/userAccount" className="nav-link">MON COMPTE UTILISATEUR</NavLink>
                </li>
                <li className="nav-item mt-4 mb-4">
                    <NavLink to="/userCardsTopics/" className="nav-link">MES TOPICS</NavLink>
                </li>
            </ul>
        </div>

    )
}