import { useState, useEffect } from 'react';
import './continentsCards.css';
import ContinentCard from '../ContinentCard/continentCard';


type TCont = {
    id: number,
    continent: string,
}


export default function ContinentsCards() {

    const [continents, setContinents] = useState<TCont[] | null>(null)

    useEffect(() => {
        const getContinents = async () => {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch('http://localhost:8000/continents', requestOptions);
            const responseJson = await response.json();
            console.log(responseJson);

            setContinents(responseJson.data);

        };

        getContinents()
            .catch(console.error);

    }, [])




    return (

        <div className="container d-flex align-items-center justify-content-center gap-3 px-0">
            {continents?.map(item => <ContinentCard item={item} key={item.id} />)}
        </div>
    )
}


