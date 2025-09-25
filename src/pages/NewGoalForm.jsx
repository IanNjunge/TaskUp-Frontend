import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewGoalForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status: "pending", priority: "medium", user_id: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Goal added!");
        navigate("/");
      })
      .catch((err) => console.error("Error creating goal:", err));
  };

  return (
    <div className="NewGoalForm container">
      <h1>New Goal</h1>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn add-btn" type="submit">
          Add Goal
        </button>
      </form>
    </div>
  );
}

export default NewGoalForm;
