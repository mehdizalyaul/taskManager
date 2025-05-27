import { useEffect, useState } from "react";

export default function EditTaskForm({ task, onSubmit }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("Pending");

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setEditedStatus(task.status);
    }
  }, [task]); // ✅ fixed incorrect dependency

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: task.id,
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-block">
        <label>Title:</label>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>
      <div className="input-block">
        <label>Description:</label>
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Task description"
        />
      </div>
      <div className="input-block">
        <label>Status:</label>
        <select
          value={editedStatus}
          onChange={(e) => setEditedStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">Update Task</button>
    </form>
  );
}
