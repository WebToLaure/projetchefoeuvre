
import { Route } from 'react-router-dom';
import Topic from '../topic/topic';
import './topics.css';

export default function Topics(props: any) {
    const { url, path } = useRouteMatch()

    return (


        <div className="topics">

            <Route path={`${path} topics/:id`}>
                <Topic />
            </Route >
        </div>



    )

}

function useRouteMatch(): { url: any; path: any; } {
    throw new Error('Function not implemented.');
}
