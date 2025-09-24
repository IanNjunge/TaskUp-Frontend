function NewGoalForm() {
    return (
    <div style={{ padding: "1rem" }}>
      <h1>New Goal</h1>
      <form>
        <div>
          <label>Title: </label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>Description: </label>
          <textarea name="description" />
        </div>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default NewGoalForm;
