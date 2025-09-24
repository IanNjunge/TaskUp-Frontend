function GoalCard({ goal }) {
  return (
    <div className="goal-card">
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <p><strong>Status:</strong> {goal.status}</p>
    </div>
  );
}
export default GoalCard;
