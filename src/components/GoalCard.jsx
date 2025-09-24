import { Link } from "react-router-dom";

function GoalCard({ goal }) {
    return (
        <div classname = "card" >
         <h2>{goal.title}</h2>
         <p>{goal.description || "No description provided."}</p>
         <p>Status: <strong>{goal.status}</strong></p>
      <Link to={`/goals/${goal.id}`} className="btn">
        View Details
      </Link>
        </div>
    )
}

export default GoalCard;