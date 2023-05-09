import "./userTopic.css";
import { AuthContext } from '../../context/authContext';
import { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";



export default function UserTopic(props: any) {

    const [continent, setcontinent] = useState<string>("");
    const [titleInput, setTitleInput] = useState<string>("");
    const [destinationsInput, setDestinationsInput] = useState<string>("");
    const [contentInput, setContentInput] = useState<string>("");

    const [showInput, setShowInput] = useState(false);


    const [topicInput, setTopicInput] = useState("")

    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    async function patchTopic() {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({
                continent: continent,
                title: titleInput,
                destinations: destinationsInput,
                content: contentInput,
            })
        };
        const response = await fetch(`http://localhost:8000/topics/${props.item.id}`, requestOptions)
        const responseJson = await response.json();

        if (responseJson.statusCode === 200) {
            props.patch(responseJson.data)
            setShowInput(false);
        };
    };
    async function deleteTopic() {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        const response = await fetch(`http://localhost:8000/topics/${props.item.id}`, requestOptions)
        const responseJson = await response.json()
        console.log("Success!", responseJson);
        if (responseJson.statusCode === 200) {
            toast.success("votre topic a bien étét supprimé", { autoClose: 1500 })
            props.del(props.item.id)
        }
    }


    function handleCancel() {
        setTitleInput(titleInput)
        setDestinationsInput(destinationsInput)
        setContentInput(contentInput)
        setShowInput(false);
        resetInput()
    }

    async function resetInput() { //remet l'input à zéro
        setTitleInput("")
        setDestinationsInput("")
        setContentInput("")
        document.getElementById('close-btn')?.click()
    }

    function update() {
        setShowInput(true)
    }

    return (
        <>
            <NavLink to={`/topic/${props.topic.id}`} className="nav-link">
                {<div className='d-flex '>
                    <div className="topicUser postion-relative">
                        <img src={`/photos/${props.topic.id}.jpg`} className="topicUser img-Top" alt="..."></img>
                        <div className=" d-flex flex-row justify-content-center align-items-center px-1 card-bodyTopic">
                            <span className="card-userTopic fs-4 dark text-center">{props.topic.destinations}</span>
                        </div>
                    </div>

                </div>}
            </NavLink >





            {showInput && <div>
                <input type='text' className="form-control" value={titleInput} placeholder="Modifier le titre" onChange={(event) => setTitleInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
            </div>}
            {showInput && <div>
                <input type='text' className="form-control" value={destinationsInput} placeholder="Modifier vos destinations" onChange={(event) => setDestinationsInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
            </div>}
            {showInput && <div>
                <input type='textarea' className="form-control" value={contentInput} placeholder="Modifier votre story" onChange={(event) => setContentInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                <button onClick={patchTopic} type="button" className="btn btn-outline-primary btn-rounded-floating ms-1" data-mdb-ripple-color="dark"><i className="bi bi-check"></i></button>
                <button onClick={handleCancel} type="button" className="btn btn-outline-secondary btn-rounded-floating ms-1" data-mdb-ripple-color="dark"><i className="bi bi-x"></i></button>
            </div>}

        </>
    )
}