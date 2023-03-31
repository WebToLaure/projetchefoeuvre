import SideBar from "../../components/sidebar/sidebar";
import "././single.css";
import Post from "../../components/post/post";

export default function Single(props:any) {
    return (
        
        <div className="single">
            <Post/>
            <SideBar/>
        </div>
    )

}