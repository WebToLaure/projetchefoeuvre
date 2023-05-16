import { useState, useEffect, useContext } from 'react';
import "./topic.css";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Commentaries from '../../components/Comments/commentaries';
import { toast } from 'react-toastify';


type TCom = {
    id: number,
    topicId: number,
    content: string,
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export default function Topic(props: any) {
    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);


    const navigate = useNavigate();
    let { id } = useParams();
    const [topic, setTopic] = useState<string>("");
    const [titleInput, setTitleInput] = useState<string>("");
    const [destinationsInput, setDestinationsInput] = useState<string>("");
    const [contentInput, setContentInput] = useState<string>("");
    const [continent, setcontinent] = useState<string>("");
    const [createdAt, SetCreatedAt] = useState("");
    const [author, SetAuthor] = useState("")
    const [image, setImage] = useState<any[]>([]);
    const [commentary, setCommentary] = useState<TCom[]>([]);

    const [showInput, setShowInput] = useState(false)
    useEffect(() => {
        const getTopic = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`http://localhost:8000/topics/${id}`, requestOptions);
            const responseJson = await response.json();
            console.log(responseJson, 'test');

            setTopic(responseJson.data.topics);
            setTitleInput(responseJson.data.title);
            setDestinationsInput(responseJson.data.destinations);
            setContentInput(responseJson.data.content);
            setImage(responseJson.data.images);
            SetCreatedAt(responseJson.data.createdAt);
            SetAuthor(responseJson.data.user.pseudo);
            setCommentary(responseJson.data.commentaries);
        };

        getTopic()
            .catch(console.error);

    }, [id]);


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
        const response = await fetch(`http://localhost:8000/topics/${id}`, requestOptions)
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
        const response = await fetch(`http://localhost:8000/topics/${id}`, requestOptions)
        const responseJson = await response.json()
        console.log("Success!", responseJson);
        if (responseJson.statusCode === 200) {
            toast.success("votre topic a bien été supprimé", { autoClose: 1500 })
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


    const imgs = image.map(elm => {
        const src = `http://localhost:8000/images/${elm.file}`;
        console.log(src);
        return <div key={elm.file} className="col-md-3"><img className="img-top" src={src} alt="photos voyages" /></div>
    })

    return (
        <>
            <div className="container-fluid border-radius-5px">

                <NavLink to="/continents"><button className="retour mt-4 me-4 p-1 text-light">Retour</button> {/* non fonctionnel */} </NavLink>

                <h1 className="TopicTitle fs-1 text-center m-3"> {titleInput}</h1>
                {showInput && <div>
                    <input type='text' className="form-control" value={titleInput} placeholder="Modifier le titre" onChange={(event) => setTitleInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </div>}

                <h3 className="TopicTitle fs-2 text-center m-3"> {destinationsInput}</h3>
                {showInput && <div>
                    <input type='text' className="form-control" value={destinationsInput} placeholder="Modifier vos destinations" onChange={(event) => setDestinationsInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </div>}

                <div className="container mt-4">
                    <div className="row d-flex align-items-center flex-wrap mt-5">
                        {imgs}
                    </div>
                </div>

                <div className="topicInfos d-flex justify-content-around m-5">
                    <span className="topicAuthor"> Author : {author}</span>
                    <span className="topicDate">Date : {createdAt}</span>
                </div>

                <p className="description m-4">{contentInput}</p>
                {showInput && <div>
                    <input type='textarea' className="form-control" value={contentInput} placeholder="Modifier votre story" onChange={(event) => setContentInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>


                    <div className="container-fluid mt-5 pt-5 mb-5 pt-5 text-center">
                        <button onClick={patchTopic} type="button" className="btn btn-outline-primary btn-sm ms-4 mb-4" data-mdb-ripple-color="dark">Valider</button>
                        <button onClick={handleCancel} type="button" className="btn btn-outline-secondary btn-sm ms-4 mb-4" data-mdb-ripple-color="dark"><i className="bi bi-x">Cancel</i></button>
                    </div>
                </div>}

                {user?.access_token && user?.user.pseudo === author &&
                    <div className="editContainer">
                        <button onClick={update} type="button" className="btn ms-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleTopicIcon bi-pencil-square ms-5" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                        <button onClick={deleteTopic} type="button" className="btn me-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleTopicIcon bi-trash3 me-5" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                        </button>
                    </div>
                }
            </div>
            <Commentaries />
        </>
    )
}




















// a conserver pour l'édition du topic du user

