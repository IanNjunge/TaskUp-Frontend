import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

function Dashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/goals")
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.error("Error loading goals:", err));
  }, []);

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>My Goals</h2>
        <a href="/new">
          <button>+ Add Goal</button>
        </a>
      </div>

      {goals.length > 0 ? (
        <div className="goal-list">
          {goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
        </div>
      ) : (
        <p className="empty-message">No goals yet. Add one!</p>
      )}
    </div>
  );
}

export default Dashboard;
