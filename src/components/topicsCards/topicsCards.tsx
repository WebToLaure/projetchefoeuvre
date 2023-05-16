import { useState, useEffect } from 'react';
import './topicsCards.css';
import TopicCard from '../topicCard/topicCard';
import { NavLink, useParams } from 'react-router-dom';
import SideBar from '../sidebar/sidebar';


export type TTop = {
    id: number,
    continent: string,
    title: string,
    destinations: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

type TImg = {
    id: number,
    originalName: string,
    file: string,

}


export default function TopicsCards() {



    const [topicsCards, setTopicsCards] = useState<TTop[] | null>(null);
    const [continent, setContinent] = useState("");


    const [images, setImages] = useState<TImg[]>([]);


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
            setImages(responseJson.data.topics.images)
            console.log(continent, "essai");
            console.log(topicsCards, "try");


        };

        getTopicsCards()
            .catch(console.error);

    }, [])//si pb pensez à remettre id dans array




    return (
        <>
         <div className="row m-2">
            <div className="col-md-9 container-card">
                <div className='d-flex flex-row justify-content-end'>
                    <NavLink to="/"><button className="retour mt-4 me-4 p-1 text-light">Retour Accueil</button></NavLink>
                </div>
                <div className="h1 text-center mt-5 border-bottom border-top mb-5">{continent}</div>
                <div className="container d-flex align-items-center justify-content-center gap-3 px-0 mt-4">
                    {topicsCards?.map(item => <TopicCard item={item} key={item.id} />)}
                </div>
            </div>
            <div className="col-md-3 topicsCards">
                <SideBar/>
            </div>
            </div>
        </>
    )
}