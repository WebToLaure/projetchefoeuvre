import { Link } from "react-router-dom";
import "./register.css";


export default function Register(props:any) {
    return (

        <div className="register">
            <span className="registerTitle">Register</span>

            <form className="registerForm mt-5">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select name="gender" id="gender" className="form-select-sm registerInput" >
                    <option value="Miss">Miss</option>
                    <option value="Mr">Mr</option>
                    <option value="Other">...</option>
                </select>

                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" name="username" id="username" className="form-control registerInput" placeholder="Enter your username.." />

                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" id="email" className="form-control registerInput" placeholder="Enter your email.." />

                <label htmlFor="password" className="form-label">password</label>
                <input type="password" name="password" id="password" className="form-control registerInput" placeholder="Enter your password.." />


                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">LogIn</button>

        </div>
    )
}
// quand l'utilisateur se trouve sur le composant register , dans topBar, il faut que les boutons register,login,LOGOUT,write et Account disparaissent disparaissent