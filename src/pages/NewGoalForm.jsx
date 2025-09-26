import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // <-- Uses Vercel/Env variable

function NewGoalForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          status: "pending",
          priority: "medium",
          user_id: 1, // temporary hardcoded user
        }),
      });

      if (!res.ok) throw new Error("Failed to create goal");

      await res.json();
      alert("Goal added!");
      navigate("/");
    } catch (err) {
      console.error("Error creating goal:", err);
      alert("Error creating goal. Please try again.");
    }
  };

  return (
    <div className="goal-form-container">
      <h1 className="goal-form-title">🎯 New Goal</h1>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter goal title..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            placeholder="Add a short description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn add-btn" type="submit">
          ➕ Add Goal
        </button>
      </form>
    </div>
  );
}

export default NewGoalForm;
