import { useState, useEffect, useContext } from 'react';
import "./topic.css";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

type TCom = {
    id: number,
    content: string,
    createdAt: Date;
    updatedAt: Date;
}



export default function Topic(props: any) {

    let { id } = useParams();
    const [topic, setTopic] = useState<string>("");
    const [titleInput, setTitleInput] = useState<string>("");
    const [destinationsInput, setDestinationsInput] = useState<string>("");
    const [contentInput, setContentInput] = useState<string>("");
    const [createdAt, SetCreatedAt] = useState("");
    const [author, SetAuthor] = useState("")

    const [image, setImage] = useState<any[]>([]);
    const [commentary, setCommentary] = useState<TCom[] | null>(null);
    const [authorOfComment, setAuthorOfComment] = useState("")

    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

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
            setAuthorOfComment(responseJson.data.commentaries.user.pseudo)

        };

        getTopic()
            .catch(console.error);

    }, [id]);

    const imgs = image.map(elm => {
        const src = `http://localhost:8000/images/${elm.file}`;
        console.log(src);


        return <div key={elm.file} className="col-md-3"><img className="img-top" src={src} alt="photos voyages" /></div>
    })

    const listComments = commentary?.map(elm => {
        return <div key={elm.id} className="mb-0">
            <h6 className="fw-bold mb-1">{elm.content}</h6>
            <div className="d-flex align-items-center mb-3">
                <p className="mb-0">
                    {elm.createdAt.toString()}
                    <span className="badge bg-primary ms-2 me-2" >Pending</span></p>
                <p className="mb-0">{elm.content}</p>
            </div>
        </div>

    })

    return (
        <>
            <div className="container-fluid border-radius-5px">

                <h1 className="TopicTitle fs-1 text-center m-3"> {titleInput}</h1>
                <h3 className="TopicTitle fs-2 text-center m-3"> {destinationsInput}</h3>

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
            </div>





            {<section className="container-comments">
                <div className="container my-5 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <h4 className="mb-0">Commentaires</h4>
                            <a href="#!" className="d-flex align-items-center me-3 text-decoration-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                </svg>
                                <p className="addComment ms-2 mb-0">Comment</p>
                            </a>
                            <p className="fw-light mb-4 pb-2">Comments section by users</p>

                            <div className="d-flex flex-start">
                                <img className="rounded-circle shadow-1-strong me-3"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
                                    height="60" />
                                {listComments}
                            </div>
                        </div>
                        <hr className="my-0" />







                    </div>
                </div>


            </section>}




        </>
    )

}






// a conserver pour l'édition du topic du user

{/* <div className="editContainer">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleTopicIcon bi-pencil-square " viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="singleTopicIcon bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
    </svg>
</div> */}