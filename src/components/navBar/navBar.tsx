import { useContext } from 'react';
import './navbar.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function NavBar(props: any): JSX.Element {

    const navigate = useNavigate()

    const { setUser } = useContext(AuthContext);

    const { user } = useContext(AuthContext);//a reporter sur mes fichiers ramène le authcontext user avec le access token

    const logOut = () => {
        setUser(null);
        setTimeout(() => navigate("auth/login"), 1500);
        //rajouter un toast vous avez ete déconnecté
    };


    return (

        <nav className='navbar navbar-expand-md bg-light sticky-top'>
            <div className='container-fluid  vw-100 h-100'>
                <div className='navbar-brand'>
                {!user?.access_token &&
                    <h4>Au Delà D'un Continent</h4>
                }
                {user?.access_token &&
                    <h4>{`Bonjour ${user.user.pseudo}`}</h4>
                }
                </div>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menuDeroulant" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-evenly" id="menuDeroulant" >
                    {/* <div className='navBar_center '> */}
                    <ul className="navbar-nav w-100">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">HOME</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/contact" className="nav-link">CONTACT</NavLink>
                        </li>
                        {user?.access_token &&
                            <li className="nav-item ">
                                <NavLink to="/write" className="nav-link" >WRITE</NavLink>
                            </li>
                        }
                        {user?.access_token &&
                            <li className="nav-item " onClick={logOut}>
                                <NavLink to="/" className="nav-link">LOGOUT</NavLink>
                            </li>
                        }
                        {user?.access_token &&
                            <div className='nav-item'>
                                <NavLink to="/settings">< img className='profilImage' src="/photos/photoProfil.jpg" alt="" /></NavLink>
                            </div>
                        }
                        {!user?.access_token &&
                            <li className="nav-item navBarLogin">
                                <NavLink to="/auth/login" className="nav-link">LOGIN</NavLink>
                            </li>
                        }
                        {!user?.access_token &&
                            <li className="nav-item navBarRegister">
                                <NavLink to="/users/register" className="nav-link">REGISTER</NavLink>
                            </li>
                        }
                    </ul>
                    {/* </div> */}
                </div>

            </div>
        </nav >



    )
}