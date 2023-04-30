import { useState, useEffect, useContext, SyntheticEvent } from 'react';
import './continentCard.css';
import { AuthContext } from '../../context/authContext';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import React from 'react';
import { Box } from 'react-bootstrap-icons';

type TTopic = {
    id: number,
    continentId: number,
    title: string,
    destinations: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}
type TCom = {
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,

}


export default function Comments(props: any) {

    let { id } = useParams();
    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [topic, setTopic] = useState("")

    useEffect(() => {

        const getTopic = async () => {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`http://localhost:8000/topics${id}`, requestOptions);
            const responseJson = await response.json();
            console.log(responseJson);

            setTopic(responseJson.data);
        };
        getTopic()
            .catch(console.error);
    }, [id])


    async function createComment(e: SyntheticEvent) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({
                content: comment
            })
        };
        const response = await fetch('http://localhost:8000/commentaries', /*{ method: "POST" }*/requestOptions);
        const responseJson = await response.json();

        user!.user.commentaries = [...user!.user.commentaries, responseJson.data]
        setUser({ ...user! });
        setComment("");
    };


    function patchComment(item: TCom) {

        const index = user!.user.commentaries.findIndex(elm => elm.id === item.id);
        user!.user.commentaries[index] = item;
        setUser({ ...user! });
    }
    function deleteComment(id: number) {
        const commentary = user!.user.commentaries.filter(item => item.id !== id);
        user!.user.commentaries = commentary;


        setUser({ ...user! });
    }
/*     const listCommentaries = user?.commentaries?.map(item => <Commentary del={deleteComment} patch={patchComment} content={item} key={item.id} />) */



    const handleClickOpen = () => {

        setOpen(true);
    }
    const handleClickClose = () => {
        setOpen(false);
    }



    return (
        <Box>






        </Box>
    )
}