import { useState, useContext } from 'react';
import './commentary.css';
import { AuthContext, TUser } from '../../context/authContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



type TCom = {
    commentary: {
        id: number,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
        user?:any
    },
    del: Function
    patch: Function
}



export default function Commentary(props: TCom) {


    const { user, setUser } = useContext(AuthContext);
    let { id } = useParams();

    const [comInput, setComInput] = useState<string>("");
    const [showInput, setShowInput] = useState(false);

    async function patchCommentary() {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({

                content: comInput
            })
        };
        const response = await fetch(`http://localhost:8000/commentaries/${props.commentary.id}`, requestOptions)
        const responseJson = await response.json();

        if (responseJson.statusCode === 200) {
            props.patch(responseJson.data)
            resetInput();
            setShowInput(false);
            return toast.success("Modifications apportées", { autoClose: 1500 });
        };
    };
    async function deleteCommentary() {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        const response = await fetch(`http://localhost:8000/commentaries/${props.commentary.id}`, requestOptions)
        const responseJson = await response.json()
        console.log("Success!", responseJson);
        if (responseJson.statusCode === 200) {
            props.del(props.commentary.id)
            return toast.success("Suppression effectuée", { autoClose: 1500 });
        };
    };

    function update() {
        setShowInput(true)
    }
    async function resetInput() { //remet l'input à zéro
        setComInput("")
        document.getElementById('close-btn')?.click()
    }

    function handleCancel() { //annul l'opération
        setComInput(comInput)
        setShowInput(false);
        resetInput()
    }

    return (
        <div className='container-fluid'>
            <div key={props.commentary.id} className="row">
                <div className="col ms-3 me-5">{props.commentary.content}</div>
            </div>
            <div className="row ms-2 font-italic">
                <div className="col-sm-4">Le {props.commentary.createdAt.toString()}</div>
                <div className="col-sm-8">par : "anonymous"</div>

            </div>
            {user?.access_token && /* user.user.pseudo === commentaries.user.id &&  */
                <div className='row ms-2 font-italic'>
                    <div className="col-sm-1 mt-1">
                        {/* <!-- Update button --> */}
                        <p className="changeComment link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={update}>Modifier</p>
                    </div>
                    {showInput && <div>
                        <input type='text' className="form-control" value={comInput} placeholder="Modifiez votre commentaire" onChange={(event) => setComInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                        <button onClick={patchCommentary} type="button" className="btn btn-outline-success btn-sm" data-mdb-ripple-color="dark" >Modifier</button>
                        <button onClick={handleCancel} type="button" className="btn btn-outline-secondary btn-sm" data-mdb-ripple-color="dark">Annuler modifications</button>
                    </div>}
                    <div className="col-sm-3 mt-1">
                        {/* <!-- Delete button --> */}
                        <p className="changeComment link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={deleteCommentary} >Supprimer</p>
                    </div>
                </div>
            }


            <hr className='mt-3' />






        </div>


    )
}