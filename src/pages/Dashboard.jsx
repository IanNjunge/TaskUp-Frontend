import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";


function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/goals")
      .then(res => res.json())
      .then(data => {
        setGoals(data);
        updateStats(data);
      })
      .catch(err => console.error("Error loading goals:", err));
  }, []);

  const updateStats = (goals) => {
    const total = goals.length;
    const completed = goals.filter(goal => goal.status === "completed").length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  };

  const handleMarkDone = async (id) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, status: "completed" } : goal
    );
    setGoals(updatedGoals);
    updateStats(updatedGoals);

    await fetch(`http://localhost:5000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
  };

  const handleDeleteGoal = async (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    updateStats(updatedGoals);

    await fetch(`http://localhost:5000/goals/${id}`, { method: "DELETE" });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Goals📈</h2>
      </div>

      <div className="goal-stats">
        <div className="goal-stat">
          <h3>Total Goals</h3>
          <p>{stats.total}</p>
        </div>
        <div className="goal-stat">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="goal-stat">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>

      {goals.length > 0 ? (
        <div className="goal-list">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onMarkDone={handleMarkDone}
              onDelete={handleDeleteGoal}
            />
          ))}
        </div>
      ) : (
        <p className="no-goals">No goals yet. Add one!</p>
      )}
    </div>
  );
}

export default Dashboard;
