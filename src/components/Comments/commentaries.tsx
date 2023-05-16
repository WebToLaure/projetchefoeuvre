import { useState, useEffect, useContext } from 'react';
import './commentaries.css';
import { AuthContext } from '../../context/authContext';
import { useParams } from 'react-router-dom';
import React from 'react';
import Commentary from './commentary';
import { toast } from "react-toastify";

export type TCom = {
    id: number,
    topicId: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    user?:any
}


export default function Commentaries(props: any) {

    let { id } = useParams();
    console.log('topic id:', id);

    const { user, setUser } = useContext(AuthContext);

    const [topic, setTopic] = useState("")


    const [commentary, setCommentary] = useState<TCom[]>([]);
    const [comment, setComment] = React.useState("");

    const [firstname, setFirstname] = React.useState("");

    const [handleClick, setHandleClick] = useState(false);

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
            console.log(responseJson, 'merdoum');


            setTopic(responseJson.data);
            setCommentary(responseJson.data.commentaries)
        };
        getTopic()
            .catch(console.error);
    }, [id])


    async function createComment() {

        console.log('topic id:', id);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({
                topicId: id,
                content: comment

            })
        };
        const response = await fetch('http://localhost:8000/commentaries', requestOptions);
        const responseJson = await response.json();
        console.log("Success!", responseJson);
        setCommentary([...commentary!, responseJson.data])
        console.log(commentary, 'commentaire ajouté');
        setUser({ ...user! });
        setComment("");
        setTopic("");
        setHandleClick(false);


        if (responseJson.statusCode === 201) {
            return toast.success("Commentaire publié", { autoClose: 2000 });
        } else {
            return toast.warning("votre commentaire n'a pas pu être publié", { autoClose: 2000 })
        }
    };

    function patchComment(item: TCom) {
        const index = user!.user.commentaries.findIndex(elm => elm.id === item.id);
        user!.user.commentaries[index] = item;
        setUser({ ...user! });
        commentary[index] = item;
        setCommentary([...commentary!])

    }

    function deleteComment(id: number) {
        const newCommentaries = user!.user.commentaries.filter(item => item.id !== id);
        user!.user.commentaries = newCommentaries;

        console.log(newCommentaries);

        setUser({ ...user! })
        setCommentary(newCommentaries)

    }




    function addComment() {
        setHandleClick(true)
    }
    async function resetInput() { //remet l'input à zéro
        setComment("")
        document.getElementById('close-btn')?.click()
    }

    function handleCancel() { //annul l'opération
        setComment(comment)
        setHandleClick(false);
        resetInput()
    }

    const listCommentaries = commentary?.map(item => <Commentary del={deleteComment} patch={patchComment} commentary={item} key={item.id} />)

    /*   const CommentsList = commentary?.map((item) => <div key={item.id} className='row'>{item.content}</div>); */

    return (
        <div className='container-fluid comments mt-5 pt-5'>
            <div className="row">
                <div className="col ms-4 mb-2 text-bold">Laissez un commentaire</div>
            </div>
            <div className="row">
                <div className='col ms-4 mb-3'>
                    <a href="#!" className="d-flex align-items-center me-3 link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots mb-3" viewBox="0 0 16 16">
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                        </svg>
                        <p className="addComment ms-2 mb-3" onClick={addComment} >Add Comment</p>
                    </a>
                </div>
                <div className="row">
                    {handleClick && <div>
                        <input type='text' className="form-control ms-4" value={comment} placeholder="Ecrivez ici votre commentaire" onChange={(event) => setComment(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                        
                        <button onClick={createComment} type="button" className="btn btn-outline-success btn-sm mb-4 ms-4" data-mdb-ripple-color="dark" >
                            <i className="bi bi-check-circle-fill">Publish</i>
                        </button>
                        <button onClick={handleCancel} type="button" className="btn btn-outline-secondary btn-sm ms-4 mb-4" data-mdb-ripple-color="dark"><i className="bi bi-x">Cancel</i></button>
                    </div>
                    }
                </div>
                <div className='row'>
                    <div className='col'>
                        {listCommentaries}
                    </div>
                </div>
            </div>
        </div>

    )
}