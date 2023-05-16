import react, { useContext, useState } from 'react';
import "././contact.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

type ProfilLog = {
    email: string;
    password: string;
}
type ProfilRegister = {
    gender: string;
    pseudo: string,
    email: string,
}
export default function Contact(props: any) {

    const auth = useContext(AuthContext)

    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("")
    const [pseudoInput, setPseudoInput] = useState("")
    const [message, setMessage] = useState("")

    async function submit(event: { preventDefault: () => void; }) {
        event.preventDefault()
        console.log('succès');
        setTimeout(() => navigate("/"), 2000);
        toast.success("Votre message a bien été envoyé", { autoClose: 1500 });
        resetInput()


        async function resetInput() { //resetInput
            setPseudoInput("")
            setEmailInput("")
            setMessage("")
            navigate("/");
        }
    }

    return (

        <div className="container-fluid">
            <div className="container mt-3">
                <div className="row ">
                    <div className="col-12">
                        <p className='Title text-center fs-1'>Au delà d'un Continent</p>
                        <hr className='SeparateLine my-5 dark opacity-50' />
                    </div>
                </div>
                <div className='row mt-4 Contact'>
                    <div className='col md-12 mt-5 text-center text-white'>
                        <p className='contact text-center fs-5' id='titre'>Contactez-moi</p>
                    </div>
                    <hr className="border text-white" />
                </div>

                <div className='row Contact '>
                    <div className="col md-12 text-center text-white border-none ">
                        <p className='contact text-center fs-5 '>Si vous souhaitez me contacter, vous pouvez le faire en utilisant le formulaire ci-dessous. Je tâcherai de vous répondre au plus vite.</p>
                    </div>
                </div>
                <div className='row Contact'>
                    <div className="col md-12 text-center text-white ">
                        <p className='contact text-center fs-5'>A très bientôt!!!</p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} id='formulaire'>
                <div className="mb-3">
                    <div className="row m-5">
                        <div className="col-5">
                            <label htmlFor="inputName" className="form-label">Pseudo</label>
                            <input type="text" className="form-control" id="inputName" placeholder="Pseudo" value={pseudoInput} onChange={(event) => setPseudoInput(event.target.value)}></input>
                        </div>

                        <div className="col-7">
                            <label htmlFor="inputEmail" className="form-label">Adresse email</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" value={emailInput} onChange={(event) => setEmailInput(event.target.value)}></input>
                            <div id="emailHelp" className="form-text">Nous ne partagerons jamais vos informations</div>
                        </div>
                    </div>
                </div>
                <div className="row mx-4">
                    <label htmlFor="message" className="form-label">Votre message</label>
                    <textarea className="form-control" id="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
                </div>

                <div className="row">
                    <div className="d-flex col justify-content-center align-items-center mt-3 mb-3">
                        <button type="submit" className="btn btn-light">ENVOYER</button>
                    </div>
                </div>
            </form>

        </div>
    )
}