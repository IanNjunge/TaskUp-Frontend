function GoalCard({ goal, onMarkDone, onDelete }) {
  return (
    <div className="goal-card">
      <div>
        <h3 className={goal.status === "completed" ? "completed" : ""}>{goal.title}</h3>
        <p>{goal.description}</p>
        <p><strong>Status:</strong> {goal.status}</p>
      </div>
      <div className="goal-buttons">
        {goal.status !== "completed" && (
          <button className="mark-done" onClick={() => onMarkDone(goal.id)}>Mark Done</button>
        )}
        <button className="delete" onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;
