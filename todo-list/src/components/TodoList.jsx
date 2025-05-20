import Task from "./Task";
import { useState } from "react";
import "../css/TodoList.css";
import TaskForm from "./TaskForm";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (taskData) => {
    const newTask = { id: uuidv4(), ...taskData };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const handleEditTask = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };
  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task
      )
    );
  };

  return (
    <div className="todo-list">
      <h2>My Tasks</h2>

      <TaskForm onSubmit={handleAddTask} />

      <div className="tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onComplete={handleCompleteTask}
          />
        ))}
      </div>
    </div>
  );
}
