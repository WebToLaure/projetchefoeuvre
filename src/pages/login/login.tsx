
import { NavLink } from "react-router-dom";
import "././login.css";


export default function Login(props: any) {




    return (

        <div className="login">
            <span className="loginTitle">LogIn</span>
            <form className="loginForm">
                <label >Email</label>
                <input type="text" className="loginInput" placeholder="Enter your email.." />

                <label >Password</label>
                <input type="password" className="loginInput" placeholder="Enter your password.." />
                <NavLink to="/">  <button className="loginButton">LogIn</button></NavLink>
            </form>

           <NavLink to="/users/register"><button className="loginRegisterButton">Register </button></NavLink>

        </div>
    )
}