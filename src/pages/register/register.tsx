import { NavLink,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";


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
     * Fonction qui permet de récupérer la data implémentée en Front par l'utilisateur et de la stocker en BDD
     * * Création du body register afin de les lier avec les input dans le return
     * * Faire appel aux requêtes back-end pour la relation Front/Back
     */
    async function Register() {


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

        if (responseJson.statusCode === 201) {
           toast.success("Compte créé avec Succès!! Vous allez être redirigé vers la page de connexion!!!",{ autoClose: 2500 })
           setTimeout(() => navigate("/auth/login"), 2000);
            resetInput()
        } else if(responseJson === 400) {
          return  toast.warning("Merci de remplir tous les champs",{ autoClose: 2000 });
        } else if (responseJson.statusCode === 404) {
            return toast.warning("Votre mot de passe ne correspond pas au critère de sécurité",{ autoClose: 2000 });
        } else if(responseJson.statusCode === 409) {
            return toast.warning("Saisie incorrecte du mot de passe de confirmation",{ autoClose: 2000 });
        } else if(responseJson.statusCode === 406) {
            return toast.warning("Pseudo déjà existant, merci de bien vouloir modifier votre pseudo",{ autoClose: 2000 });
        } else {
            return toast.error ("Une erreur s'est produite, merci de bien vouloir réitérer votre demande",{ autoClose: 2000 })
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
                <p className="note text-white mt-1"> * Tous les champs sont obligatoires.</p>
                    <form className="container-form" onSubmit={(e) => { e.preventDefault(); Register(); }}>
                        <div className=" form-log rounded-5 shadow-5-strong p-3 ">
                            <div className="col text-center text-white align-items-center  mb-3 mt-">
                                <h4 className="titleRegister m-0">Inscription</h4>
                            </div>

                            <label htmlFor="gender" className="form-label text-white m-0">Gender* </label>
                            <div className="form-outline mt-2">
                                <select name="gender" id="gender" className="form-select-sm registerInput col-6" value={genderInput} onChange={(event) => setGenderInput(event.target.value)}>
                                    <option key ="selectGender"value={0}>Renseignez svp</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Other">...</option>
                                </select>
                            </div>

                            <label htmlFor="pseudo" className="form-label text-white m-0 mt-3">Pseudo*</label>
                            <div className="form-outline mb-3 mt-2">
                                <input type="text" id="pseudo"  className="form-control registerInput" title ="Veuillez renseigner votre pseudo utilisateur" placeholder="Entrer votre pseudo.." value={pseudoInput} onChange={(event) => setPseudoInput(event.target.value)} required/>
                            </div>

                            <label htmlFor="email" className="form-label text-white m-0">Email address*</label>
                            <div className="form-outline mb-3 mt-2">
                                <input type="email" id="email" title="Veuillez renseigner votre adresse email" className="form-control registerInput" /* pattern="(\w\.?)+@[\w\.-]+\.\w{2,}" */ placeholder="Entrer votre email.." value={emailInput} onChange={(event) => setEmailInput(event.target.value)} required/>
                            </div>

                            <label htmlFor="password" className="form-label text-white m-0">Password*</label>
                            <div className="form-outline mb-3 mt-2">
                                <input type="password" className="form-control registerInput" id="password" title=" Votre mot de passe doit comprendre entre 8 et 20 caractères,au moins une Majuscule, un caractère spécial,des lettres et des chiffres" placeholder="8-20 dont Majuscule, caractère spécial, lettre et chiffre" value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} aria-labelledby="passwordHelpBlock" required/>
                                <div id="passwordHelpBlock" className="form-text text-light text-bold">
                                </div>
                            </div>

                            <label htmlFor="passwordConfirm" className="form-label text-white m-0">Password Confirm*</label>
                            <div className="form-outline mb-3 mt-2">
                                <input type="password" className="form-control registerInput" id="passwordConfirm"  title="Merci de saisir à nouveau votre mot de passe" placeholder="Confirmer votre mot de passe.." value={passwordConfirmInput} onChange={(event) => setPasswordConfirmInput(event.target.value)} required/>
                                <div id="passwordHelpBlock" className="form-text text-light text-bold">
                                    Please confirm your password..
                                </div>
                            </div>

                            <div className="col-center text-center align-items-center mt-3">
                                <button type="submit" title ="Appuyez ici pour valider vos informations" className="btn-block registerButton col-4">S'inscrire</button>
                            </div>
                            <div className="col-center text-center justify-content-center align-items-center mt-4">
                                <div id="passwordHelpBlock" className="form-text text-white text-bold">
                                    Déjà un compte?</div>
                                <NavLink to="/auth/login"><button className="LoginBtn btn-block rounded col-6 mt-1 m-0" title="Si vous avez déjà un compte, appuyez ici">Se connecter</button></NavLink>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
