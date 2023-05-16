import { useNavigate, useParams } from "react-router-dom";
import "./MonCompte.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";

export default function MonCompte(props: any) {

    const { user, setUser } = useContext(AuthContext);
    const token = user?.access_token;
    const [userAccount, setUserAccount] = useState([]);

    let { id } = useParams();
    const navigate = useNavigate();

  

    const [pseudoInput, setPseudoInput] = useState(user?.user.pseudo);
    const [emailInput, setEmailInput] = useState(user?.user.email);
   
    async function patchUser(e: React.BaseSyntheticEvent) {
        e.preventDefault();


        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({

                pseudo: pseudoInput,
                email: emailInput
            })
        };
        const response = await fetch(`http://localhost:8000/users/${user?.user.id}`, requestOptions)
        const responseJson = await response.json();
        console.log(responseJson, "user");

        if (responseJson.statusCode === 200) {
            const newPseudo = responseJson.data;
            setPseudoInput(newPseudo);
            toast.success("Compte modifié avec succès!!!", { autoClose: 1500 })
            setTimeout(() => navigate("/userSettings"), 1500);
        };
    };


    const userDelete = (e: React.BaseSyntheticEvent) => {

        e.preventDefault();

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        async function deleteUser() {

            const response = await fetch("http://localhost:8000/users", requestOptions)
            const responseJson = await response.json()
            setUserAccount(responseJson);
            console.log("Success!", responseJson);

            if (userAccount) {   
                setUser(null); 
                toast.success("Compte supprimé, À TRÈS BIENTÔT J'ESPÈRE !!!", { autoClose: 1500 })
                setTimeout(() => navigate("/users/register"), 1500);
            }else {
                return
            }
        };
        deleteUser()
    }


    return (

        <div className="container-fluid">
            <div className="row m-2">
                <div className="settings d-flex">
                    <div className="settingsWrapper">
                        <div className="settingsTitle">
                            <span className="settingsUpdateTitle">Mise à jour du Compte</span>
                            <span className="settingsDeleteTitle" onClick={userDelete}>Supprimer votre compte</span>
                        </div>


                        <form className="settingsForm" onSubmit={patchUser} >
                            <label>Pseudo</label>
                            <input required type="text" defaultValue={user?.user.pseudo} placeholder="pseudo" onChange={(event) => setPseudoInput(event.target.value)} />

                            <label htmlFor="email" className="form-label">Adresse Email</label>
                            <input required type="email" name="email" className="form-control" placeholder="name@example.com" defaultValue={user?.user.email} onChange={(event) => setEmailInput(event.target.value)} />

                            <label>Mot De Passe</label>
                            <input type="password" name="password" id="password" readOnly value="password" aria-label="Disabled input example" disabled />

                            <button type="submit" className="settingsSubmit">Mettre à jour</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>




    )
}