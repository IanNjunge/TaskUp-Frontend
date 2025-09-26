import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

const API_URL = import.meta.env.VITE_API_URL; // <-- Uses Vercel/Env variable

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetch(`${API_URL}/goals`)
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
        updateStats(data);
      })
      .catch((err) => console.error("Error loading goals:", err));
  }, []);

  const updateStats = (goals) => {
    const total = goals.length;
    const completed = goals.filter((goal) => goal.status === "completed").length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  };

  const handleMarkDone = async (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, status: "completed" } : goal
    );
    setGoals(updatedGoals);
    updateStats(updatedGoals);

    try {
      await fetch(`${API_URL}/goals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
    } catch (err) {
      console.error("Error marking goal done:", err);
    }
  };

  const handleDeleteGoal = async (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    updateStats(updatedGoals);

    try {
      await fetch(`${API_URL}/goals/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Section Header */}
      <div className="dashboard-header">
        <span>📈</span>
        <h2>Dashboard</h2>
      </div>

      {/* Stats Section */}
      <div className="goal-stats">
        <div className="total-goals">
          <h2>{stats.total}</h2>
          <p>Total Goals</p>
        </div>
        <div className="completed-goals">
          <h2>{stats.completed}</h2>
          <p>Completed</p>
        </div>
        <div className="pending-goals">
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>
      </div>

      {/* Goals List */}
      {goals.length > 0 ? (
        <div className="goal-list">
          {goals.map((goal) => (
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
