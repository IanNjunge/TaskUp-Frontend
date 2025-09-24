import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      {goals.length === 0 ? (
        <p>No goals yet. Add one!</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <Link to={`/goals/${goal.id}`}>{goal.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
