
import { NavLink } from "react-router-dom";
import "./register.css";
import { useState } from "react";



type ProfilRegister = {
    gender: string;
    pseudo: string,
    email: string,
    password: string,
    password_confirm: string,

}


/**
  * @function Register
  * 
  * Elle permet de créer un composant globale de tous les éléments liés à la création d'un compte utilisateur:
  * 
  * * Variables de stockage des données
  * * Faire appel aux requêtes back-end pour la relation Front/Back
  * * Un return visuel avec bootstrap pour la partie visible en html
  * * Des méthodes de fonctionnement aux events onChange(input), Onclick(button)
  * * Gestion des erreurs en Front, visible de l'utilisateur pour le guider
  */
export default function Register(props: any) {

    const [genderInput, setGenderInput] = useState("")
    const [pseudoInput, setPseudoInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("")


    /**
     * @function Register
     * 
     * Fonction qui permet de récupérer la data implémentée en Front par l'utilisateur et de la stocker en BDD
     * 
     * * Création du body register afin de les lier avec les input dans le return
     * * Faire appel aux requêtes back-end pour la relation Front/Back
     */
    async function DataRegister(event: { preventDefault: () => void; }) {

        event.preventDefault()

        // body du register sur la partie html
        const body: ProfilRegister = {
            gender: genderInput,
            pseudo: pseudoInput,
            email: emailInput,
            password: passwordInput,
            password_confirm: passwordConfirmInput,

        }

        // Options de requêtes et envoi des données des input en BDD
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch('http://localhost:8000/users/register', requestOptions);
        const responseJson = await response.json();


        //si nous avons la réponse json du register dans la console, alors nous faisons un reset des input du formulaire

        if (responseJson.statusCode === 201) {
            resetInput()
            alert("Votre Compte a été créé avec succès");
        }

        else {
            return
        }

    }

    async function resetInput() { //resetInput

        setGenderInput("")
        setPseudoInput("")
        setEmailInput("")
        setPasswordInput("")
        setPasswordConfirmInput("")







    }

    return (

        <div className="register">
            <span className="registerTitle">Register</span>

            <form className="registerForm mt-5">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select name="gender" id="gender" className="form-select-sm registerInput" value={genderInput} onChange={(event) => setGenderInput(event.target.value)}>
                    <option value="Miss">Miss</option>
                    <option value="Mr">Mr</option>
                    <option value="Other">...</option>
                </select>

                <label htmlFor="username" className="form-label">Pseudo</label>
                <input type="text" name="username" id="username" className="form-control registerInput" placeholder="Enter your username.." value={pseudoInput} onChange={(event) => setPseudoInput(event.target.value)} />

                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" id="email" className="form-control registerInput" placeholder="Enter your email.." value={emailInput} onChange={(event) => setEmailInput(event.target.value)} />

                <label htmlFor="password" className="form-label">password</label>
                <input type="password" name="password" id="password" className="form-control registerInput" placeholder="Enter your password.." value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} />

                <label htmlFor="password" className="form-label">password Confirm</label>
                <input type="password" name="password" id="password" className="form-control registerInput" placeholder="Enter your password.." value={passwordConfirmInput} onChange={(event) => setPasswordConfirmInput(event.target.value)} />
                
                <button className="registerButton" onSubmit={DataRegister}>Register</button>
            </form>

            <NavLink to="/users/login"><button className="registerLoginButton">LogIn</button></NavLink>

        </div>
    )
}
// quand l'utilisateur se trouve sur le composant register , dans topBar, il faut que les boutons register,login,LOGOUT,write et Account disparaissent disparaissent