import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../components/GoalCard";

function Dashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  return (
    <div classname = "Dashboard container">
      <h1>Dashboard</h1>
      {goals.length === 0 ? (
        <p>No goals yet. Add one!</p>
      ) : (
        goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
