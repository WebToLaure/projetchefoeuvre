import { NavLink, useNavigate } from "react-router-dom";
import "././settings.css";
import SideBar from "../../components/sidebar/sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

export default function Settings(props: any) {

    const [pseudoInput, setPseudoInput] = useState("");
    

    const auth = useContext(AuthContext);
    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    async function patchUser() {

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({

                pseudo: pseudoInput
            })
        };
        const response = await fetch("http://localhost:8000/users", requestOptions)
        const responseJson = await response.json();


        if (responseJson.statusCode === 200) {
            const newPseudo = responseJson.data;
            setPseudoInput(newPseudo);
        };
    };

    async function deleteUser() {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        const response = await fetch("http://localhost:8000/users", requestOptions)
        const responseJson = await response.json()
        console.log("Success!", responseJson);
        if (responseJson.statusCode === 200) {
            auth.setUser({ ...responseJson });
            navigate("/users/register");
        }


    }




    return (
        <div className="container-fluid">
            <div className="row m-2">
                <div className="settings d-flex">
                    <div className="settingsWrapper">
                        <div className="settingsTitle">
                            <span className="settingsUpdateTitle">Update Your Account</span>
                            <span className="settingsDeleteTitle">Delete Your Account</span>
                        </div>
                        <form className="settingsForm">
                            <label >Profile Picture</label>
                            <div className="settingsProfilePicture">

                                <img src="/photos/photoProfil.jpg" alt="" />
                                <label htmlFor="fileInput">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="settingsProfilePictureIcon bi bi-person-bounding-box" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    </svg>
                                </label>
                                <input type="file" id='fileInput' style={{ display: 'none' }} />

                            </div>
                            <label>Pseudo</label>
                            <input type="text" value={pseudoInput} placeholder="Inconnu" onChange={(event) => setPseudoInput(event.target.value)} />

                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name="email" id="email" readOnly value="johnDoe@gmail.com" autoFocus />

                            <label>Password</label>
                            <input type="password" placeholder="Inconnu" />

                            <button onClick={() => patchUser()} className="settingsSubmit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}