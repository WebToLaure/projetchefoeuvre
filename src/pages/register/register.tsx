
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";



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
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    /**
     * @function Register
     * 
     * Fonction qui permet de récupérer la data implémentée en Front par l'utilisateur et de la stocker en BDD
     * 
     * * Création du body register afin de les lier avec les input dans le return
     * * Faire appel aux requêtes back-end pour la relation Front/Back
     */
    async function Register(event: { preventDefault: () => void; }) {

        event.preventDefault()

        // Options de requêtes et envoi des données des input en BDD
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                gender: genderInput,
                pseudo: pseudoInput,
                email: emailInput,
                password: passwordInput,
                password_confirm: passwordConfirmInput,
            })
        };

        const response = await fetch('http://localhost:8000/users/register', requestOptions);
        const responseJson = await response.json();
        console.log(response);
        console.log(responseJson);

        //après validation de la requête, annuler toutes les saisies des inputs

        if (responseJson.statusCode === 201) {
            console.log("test");
            navigate("/auth/login")
            resetInput()
            alert("Compte créé avec succès,vous pouvez vous connecter à présent")
        } else if (responseJson === 400) {
            alert("Votre civilité n'a pas été renseignée");
        } else if (responseJson.statusCode === 404) {
            alert("Votre mot de passe ne correspond pas au critère de sécurité");
        } else if (responseJson.statusCode === 409) {
            alert("Saisie incorrecte du mot de passe de confirmation");
        } else if (responseJson.message === "L'Email existe déjà") {
            alert(responseJson.message);
        } else {
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

        <div className="container-fluid">
            <div className="row justify-content-center register mx-2 ">
                <div className="col-xl-4 col-md-8">
                    <div className=" form-log rounded-5 shadow-5-strong p-3 ">
                        <div className="col text-center text-white align-items-center  mb-3 mt-2">
                            <h4 className="titleRegister m-0">Register</h4>
                        </div>

                        <label htmlFor="gender" className="form-label text-white m-0">Gender</label>
                        <div className="form-outline mt-2">
                            <select name="gender" id="gender" className="form-select-sm registerInput col-6" value={genderInput} onChange={(event) => setGenderInput(event.target.value)}>
                                <option value="Miss"></option>
                                <option value="Miss">Miss</option>
                                <option value="Mr">Mr</option>
                                <option value="Other">...</option>
                            </select>
                        </div>

                        <label htmlFor="pseudo" className="form-label text-white m-0">Pseudo</label>
                        <div className="form-outline mb-3 mt-2">
                            <input type="text" id="pseudo" className="form-control registerInput" placeholder="Enter your pseudo.." value={pseudoInput} onChange={(event) => setPseudoInput(event.target.value)} />
                        </div>
                        <label htmlFor="email" className="form-label text-white m-0">Email address</label>
                        <div className="form-outline mb-3 mt-2">
                            <input type="email" id="email" className="form-control registerInput" placeholder="Enter your email.." value={emailInput} onChange={(event) => setEmailInput(event.target.value)} />
                        </div>
                        <label htmlFor="password" className="form-label text-white m-0">Password</label>
                        <div className="form-outline mb-3 mt-2">
                            <input type="password" className="form-control registerInput" id="password" placeholder="Enter your password.." value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} />
                            <div id="passwordHelpBlock" className="form-text text-light text-bold">
                                Your password must be 8-20 characters long, contain at least an upper case letter, a number, and must contain special characters..
                            </div>
                        </div>
                        <label htmlFor="passwordConfirm" className="form-label text-white m-0">Password Confirm</label>
                        <div className="form-outline mb-3 mt-2">
                            <input type="password" className="form-control registerInput" id="passwordConfirm" placeholder="Confirm your password.." value={passwordConfirmInput} onChange={(event) => setPasswordConfirmInput(event.target.value)} />
                            <div id="passwordHelpBlock" className="form-text text-light text-bold">
                                Please confirm your password..
                            </div>
                        </div>
                        <div className="col-center text-center align-items-center mt-3">
                            <button type="button" className="btn-block registerButton col-4" onClick={Register}>Register</button>
                        </div>
                        <div className="col-center text-center justify-content-center align-items-center mt-2 mb-2">
                            <NavLink to="/auth/login"><button className="LoginBtn btn-block rounded col-6 ">Se connecter</button></NavLink>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
