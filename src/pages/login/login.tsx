import { NavLink, useNavigate } from "react-router-dom";
import "././login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";


type ProfilLog = {
    email: string;
    password: string;
}
export default function Login(props: any) {
    const { user,setUser } = useContext(AuthContext);

    const [emailInput, setEmailLogInput] = useState("")
    const [passwordInput, setPasswordLogInput] = useState("")

    const auth = useContext(AuthContext)

    const navigate = useNavigate();
    async function fetchDataLog(event: { preventDefault: () => void; }) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

                email: emailInput,
                password: passwordInput,
            })
        };

        const response = await fetch('http://localhost:8000/auth/login', requestOptions);
        const responseJson = await response.json();


        if (responseJson.access_token) {
            auth.setUser({ ...responseJson });
            toast.success(`Bonjour et ravie de vous revoir!!`)
            resetInputLog()
            setTimeout(() => navigate("/"), 5000);
        }

        else {
            resetInputLog()
            return (
                toast.warning("Email ou mot de passe incorrect")
            )

        };

    }

    async function resetInputLog() { //resetInput
        setEmailLogInput("")
        setPasswordLogInput("")
    }




    return (

        <div className="container-fluid ">
            <div className="row justify-content-center mx-2 login ">
                <div className="col-xl-4 col-md-8">
                    <form className="container-form">
                        <div className=" form-log rounded-5 shadow-5-strong p-5">

                            {/* <!-- title connexion --> */}
                            <div className="col text-center text-white align-items-center mb-5 mt-5">
                                <h4>Connexion</h4>
                            </div>

                            {/* <!-- Email input --> */}
                            <label htmlFor="email" className="text-white">Email</label>
                            <div className="form-outline mb-3 mt-2">
                                <input type="email" className="form-control" placeholder="Email" value={emailInput} onChange={(event) => setEmailLogInput(event.target.value)}></input>
                            </div>

                            {/* <!-- Password input --> */}
                            <label htmlFor="password" className="text-white">Password</label>
                            <div className="form-outline mb-3 mt-2">
                                <input type="password" className="form-control" placeholder="Enter your password.." value={passwordInput} onChange={(event) => setPasswordLogInput(event.target.value)}></input>
                            </div>

                            {/* <!-- Simple link --> */}
                            <div className="col-center text-center align-items-center">
                                <a href="#!" className="link-light text-primary">Mot de passe oublié ?</a>
                            </div>

                            {/* <!-- Submit button Login--> */}
                            <div className="col-center text-center align-items-center mt-4">
                                <button type="button" className="btn-block loginButton rounded col-6" onClick={fetchDataLog}>Se connecter</button>
                            </div>

                            {/* <!-- Submit button Register --> */}
                            <div className="col-center text-center align-items-center mt-5">
                                <NavLink to="/users/register"><button type="button" className="btn btn-dark btn-block col-6">Créez votre compte</button></NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}



