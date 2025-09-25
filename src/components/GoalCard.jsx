import { Link } from "react-router-dom";

function GoalCard({ goal }) {
  return (
    <Link
      to={`/goals/${goal.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="goal-card">
        <h3>{goal.title}</h3>
        <p>{goal.description}</p>
        <p><strong>Status:</strong> {goal.status}</p>
      </div>
    </Link>
  );
}

export default GoalCard;
