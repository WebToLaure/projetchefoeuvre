import "././write.css";


export default function Write(props:any) {

    return (
        <div className="write">
            <img className="writeImg" src="/photos/photoMexique.jpg" alt=""/>
            <form className="writeForm">
                <div className="WriteFormGroup">
                    <label htmlFor="fileInput">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="add" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </label>
                    <input type="text" placeholder="Title" className="writeInput" autoFocus />
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                </div>
                <div className="writeFormGroup">
                    <textarea className="writeInput writeText" placeholder="Tell your story..."></textarea>
                </div>
                <button type ="button"className="writeSubmit">Publish</button>

            </form>

        </div>
    )

}