import { useParams, useLocation } from "react-router";

export default function FilmPages() {
    const param = useParams();
    const location = useLocation();

    console.log(param);
    console.log(location);

    return (
        <div>
            <p>id : {param.id}</p>
        </div>
    )
}