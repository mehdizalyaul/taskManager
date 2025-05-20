import "../css/Task.css";
export default function Task({ task, onDelete, onComplete, onEdit }) {
  return (
    <div className="task" key={task.id}>
      <div className="info_task">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button
          className={`status-btn ${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {task.status}
        </button>
      </div>
      <div className="manipulat_task">
        <button className="edit-btn" onClick={() => onEdit(task.id)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
        <button className="complete-btn" onClick={() => onComplete(task.id)}>
          Complete
        </button>
      </div>
    </div>
  );
}
