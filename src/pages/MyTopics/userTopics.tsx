import "./userTopic.css";
import { AuthContext } from '../../context/authContext';
import { useState, useContext } from 'react';
import UserTopic from "./userTopic";


type TTop = {
        id: number,
        continentId: string,
        title: string,
        destinations: string,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }


export default function UserTopics() {

    const [titleInput, setTitleInput] = useState<string>("");
    const [destinationsInput, setDestinationsInput] = useState<string>("");
    const [contentInput, setContentInput] = useState<string>("");

    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);


    function patchTopic(item: TTop) {
        const index = user!.user.topics.findIndex(elm => elm.id === item.id);
        user!.user.topics[index] = item;
        setUser({ ...user! });


    }
    function deleteTopic(id: number) {
        const newtopics = user!.user.topics.filter(item => item.id !== id)
        user!.user.topics = newtopics;
        setUser({ ...user! });

    }
    const listTopics = user?.user?.topics?.map(item => <UserTopic del={deleteTopic} patch={patchTopic} topic={item} key={item.id} />)




    return (
        <>
            <div className="h1 text-center mt-5 border-bottom border-top">Liste de vos Topics</div>
            <div className="container d-flex align-items-center justify-content-center gap-3 px-0 mt-4">
                {listTopics}
            </div>

        </>
    )




}