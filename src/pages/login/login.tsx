
import { NavLink } from "react-router-dom";
import "././login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

type ProfilLog = {
    email: string;
    password: string;
}
export default function Login(props: any) {

    const [emailInput, setEmailLogInput] = useState("")
    const [passwordInput, setPasswordLogInput] = useState("")

    const auth = useContext(AuthContext)

    async function fetchDataLog() {

        const body: ProfilLog = {
            email: emailInput,
            password: passwordInput,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch('http://localhost:8000/auth/login', requestOptions);
        const responseJson = await response.json();


        if (responseJson.access_token) {
            auth.setUser({ ...responseJson });
            resetInputLog()
        }

        else {
            return
        }

    }

    async function resetInputLog() { //resetInput
        setEmailLogInput("")
        setPasswordLogInput("")
    }




    return (

        
            <div className="login">

                <span className="loginTitle">Se connecter</span>
                <form className="loginForm">
                    <label >Email</label>
                    <input type="text" className="loginInput" placeholder="Enter your email.." value={emailInput} onChange={(event) => setEmailLogInput(event.target.value)} />

                    <label >Password</label>
                    <input type="password" className="loginInput" placeholder="Enter your password.." value={passwordInput} onChange={(event) => setPasswordLogInput(event.target.value)} />
                    <NavLink to="/"> <button className="loginButton" onClick={fetchDataLog}>Se connecter</button></NavLink>
                </form>

                <NavLink to="/users/register"><button className="loginRegisterButton">Register </button></NavLink>

            </div>
      
    )
}