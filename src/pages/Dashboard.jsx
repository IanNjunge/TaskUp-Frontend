import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../components/GoalCard";

function Dashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error loading goals:", err));
  }, []);

  const handleQuickDelete = async (id) => {
    await fetch(`http://localhost:5000/goals/${id}`, { method: "DELETE" });
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>My Goals</h2>
        <Link to="/new">
          <button className="btn add-btn">+ Add Goal</button>
        </Link>
      </div>

      {goals.length > 0 ? (
        <div className="goal-list">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-row">
              <GoalCard goal={goal} />
              <button
                className="btn delete-btn"
                onClick={() => handleQuickDelete(goal.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No goals yet. Add one!</p>
      )}
    </div>
  );
}

export default Dashboard;
