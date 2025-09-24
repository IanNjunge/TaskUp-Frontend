import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function GoalDetail() {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Fetch the goal on mount
  useEffect(() => {
    fetch(`http://localhost:5000/goals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGoal(data);
        setTitle(data.title);
        setDescription(data.description || "");
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
      body: JSON.stringify({ title, description }),
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
    <div className="GoalDetail container">
      <div className="card">
        {!editing ? (
          <>
            <h1>{goal.title}</h1>
            <p>{goal.description}</p>
            <p>Status: <strong>{goal.status}</strong></p>
            <p>Deadline: {goal.deadline || "No deadline set"}</p>

            <button className="btn" onClick={() => setEditing(true)}>
              Edit Goal
            </button>
            <button
              className="btn"
              style={{ marginLeft: "0.5rem", background: "red" }}
              onClick={handleDelete}
            >
              Delete Goal
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <div>
              <label>Title: </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Description: </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="btn" type="submit">
              Save
            </button>
            <button
              type="button"
              className="btn"
              style={{ marginLeft: "0.5rem", background: "gray" }}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoalDetail;
