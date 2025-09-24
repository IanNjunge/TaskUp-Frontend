import { useParams } from "react-router-dom";

function GoalDetail () {
    const { id } = useParams();
    return (
        <div>
            <h1>Goal Detail</h1>
            <p>Goal ID: {id}</p>
        </div>
    )
}

export default GoalDetail;  