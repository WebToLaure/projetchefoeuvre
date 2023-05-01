import "././write.css";
import { useState, useContext, useEffect, useRef, SyntheticEvent } from 'react';

import { AuthContext } from '../../context/authContext';



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
type TCont = {
    id: number,
    continent: string,
}

export default function Write(props: any) {

    // get continents
    const [continents, setContinents] = useState<TCont[] | null>(null)
    const [continentInput, setContinentInput] = useState(0);

    const [titleInput, setTitleInput] = useState<string>("");
    const [destinationsInput, setDestinationsInput] = useState<string>("");
    const [contentInput, setContentInput] = useState<string>("");
    const [fileInput, setFileInput] = useState<FileList>();

    /*     const token = useContext(AuthContext).user?.access_token; */
    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const formRef = useRef(null);

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

    function findContinent(continentId: number) {

        if (continents) {
            const selectedContinent = continents.find((item) => item.id === continentId);
            if (selectedContinent) {
                const selectedContinents = selectedContinent.id;
                setContinentInput(selectedContinents);
            }
        }
    }
    console.log(continentInput, "test");


    async function addTopic(e: SyntheticEvent) {
        e.preventDefault();


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({
                continentId: continentInput,
                title: titleInput,
                destinations: destinationsInput,
                content: contentInput,
            })
        };
        const response = await fetch('http://localhost:8000/topics/new', requestOptions);
        const responseJson = await response.json();



        if (responseJson?.data?.id) {

            addImageToTopic(responseJson.data.id, e);
        }

        user!.user.topics = [...user!.user.topics, responseJson.data]

        setUser({ ...user! });
        resetInput();
    };

    async function addImageToTopic(topicId: number, e: SyntheticEvent) {
        const form = new FormData();

        if (!fileInput) {
            return;
        }
        // @ts-ignore
        for (const file of fileInput) {
            form.append('files[]', file, file.name)
        }
        //form.append("file", fileInput);
        const requestOptions = {
            method: 'POST',
            headers: {
                //'content-type': fileInput.type,
                //'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                //'content-length': `${fileInput.size}`,
                Authorization: `Bearer ${user?.access_token}`
            },
            body: form
        }

        const response = await fetch(`http://localhost:8000/images/uploads/${topicId}`, requestOptions)
        const responseJson = await response.blob();
        console.log(responseJson);

    }
    function resetInput() { // remet l'input à zéro.
        setContinents([])
        setTitleInput("")
        setDestinationsInput("")
        setContentInput("")
        document.getElementById('close-btn')?.click()
    }



    const onChangeImage = (event: React.FormEvent) => {
        console.log(event, (event.target as HTMLInputElement).files);

        const files = (event.target as HTMLInputElement).files
        if (files && files.length > 0) {
            setFileInput(files)
        }
    }


    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!formRef) {
            return
        }

    }




    const listContinents = continents?.map(elm => <option value={elm.id} key={elm.continent}>{elm.continent}</option>)
    console.log(listContinents);

    return (
        <div className="container-topic">
            <div className="container-fluid border-radius-5px">
                <h1 className="text-center mt-5">Ecrivez votre Topic</h1>

                <form method='post' encType='multipart/form-data' ref={formRef} className="was-validated" onSubmit={addTopic}>
                    <div className="form-group">
                        <select className="custom-select custom-select-sm mt-5 ms-5 mb-4 me-1 rounded" required value={continentInput} onChange={(event) => findContinent(+event.target.value)}>
                            <option key="selectContinent" value={0}>Veuillez sélectionner un continent</option>
                            {listContinents}
                            <div className="invalid-feedback">Example invalid custom select feedback</div>
                        </select>
                    </div>

                    <label className="TopicTitle fs-1 text-center m-3"></label>
                    <input type='text' className="form-control" value={titleInput} placeholder="Titre de votre Topic" onChange={(event) => setTitleInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>


                    <label className="TopicTitle fs-2 text-center m-3"></label>
                    <input type='text' className="form-control" value={destinationsInput} placeholder="Pays visités" onChange={(event) => setDestinationsInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>

                    

                    <div className="input-group mb-2 mt-5 justify-content-center">
                        <label htmlFor="upload-file" className="upload-file">Téléchargez vos photos (min.4 max. 8) </label>
                        <input type="file" name="file ms-3" id="upload-file"
                            /* value={props.images} */
                            onChange={onChangeImage} multiple />
                    </div>

                    <label htmlFor="topic" className="topicText mt-4 ms-2 mb-3">Racontez-nous votre voyage : </label>
                    <textarea className="textarea form-control m-auto" value={contentInput} id="topic" placeholder="Tell us Your Story" onChange={(event) => setContentInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2" autoFocus></textarea>

                    <div className="container-button d-flex flex-column justify-content-center align-items-center mb-3">
                        <button type="submit" className="writeSubmit mt-4" data-mdb-ripple-color="dark">Publish</button>
                    </div>
                </form>
            </div >
        </div>
    )

}