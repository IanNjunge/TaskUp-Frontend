import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function GoalDetail() {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  // Fetch the goal
  useEffect(() => {
    fetch(`http://localhost:5000/goals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGoal(data);
        setTitle(data.title);
        setDescription(data.description || "");
        setStatus(data.status || "pending");
      })
      .catch((err) => console.error("Error fetching goal:", err));
  }, [id]);

  // Delete handler
  const handleDelete = () => {
    fetch(`http://localhost:5000/goals/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("Goal deleted!");
          navigate("/");
        } else {
          alert("Failed to delete goal.");
        }
      })
      .catch((err) => console.error("Error deleting goal:", err));
  };

  // Update handler
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoal(data);
        setEditing(false);
        alert("Goal updated!");
      })
      .catch((err) => console.error("Error updating goal:", err));
  };

  if (!goal) {
    return <p className="container">Loading goal...</p>;
  }

  return (
    <div className="goal-detail-container">
      <div className="goal-detail-card">
        {!editing ? (
          <>
            <h1>{goal.title}</h1>
            <p>{goal.description}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={goal.status === "completed" ? "status-completed" : "status-pending"}>
                {goal.status}
              </span>
            </p>
            <p>
              <strong>Deadline:</strong> {goal.deadline || "No deadline set"}
            </p>

            <div className="goal-detail-buttons">
              <button className="btn edit-btn" onClick={() => setEditing(true)}>
                ✏️ Edit
              </button>
              <button className="btn delete-btn" onClick={handleDelete}>
                🗑 Delete
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="goal-edit-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="goal-detail-buttons">
              <button className="btn save-btn" type="submit">
                💾 Save
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() => setEditing(false)}
              >
                ✖ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoalDetail;
