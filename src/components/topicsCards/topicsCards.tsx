import { useState, useEffect } from 'react';
import './topicsCards.css';
import TopicCard from '../topicCard/topicCard';
import { NavLink, useParams } from 'react-router-dom';
import SideBar from '../sidebar/sidebar';

type TTop = {
    id: number,
    continent: string,
    title: string,
    destinations: string,
    content: string,

}

/* type TImg = {
    id: number,
    originalName: string,
    file: string,
   
} */


export default function TopicsCards() {

    const [topicsCards, setTopicsCards] = useState<TTop[] | null>(null)
    const [continent, setContinent] = useState("")
   /*  const [images, setImages] = useState<TImg[] | null>(null); *///a controler


    let { id } = useParams();
    console.log('continent id:', id);
    useEffect(() => {
        console.log("useEffect est appelé");

        const getTopicsCards = async () => {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`http://localhost:8000/continents/${id}`, requestOptions);
            const responseJson = await response.json();
            console.log(responseJson, 'test');

            setTopicsCards(responseJson.data.topics);
            setContinent(responseJson.data.continent);
            /* setImages(responseJson.data.topics.images) *///a contrôler
            console.log(/* setImages, */ "essai");

        };

        getTopicsCards()
            .catch(console.error);

    }, [id])


    return (
        <>
            <div className="h1 text-center mt-5 border-bottom border-top">{continent}</div>
            <div className="container d-flex align-items-center justify-content-center gap-3 px-0 mt-4">

                {topicsCards?.map(item => <TopicCard item={item} key={item.id} />)}
            </div>

        </>
    )
}