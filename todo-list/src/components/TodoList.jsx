import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";
import "../css/TodoList.css";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasksToStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = (taskData) => {
    const newTask = { id: uuidv4(), ...taskData };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setTaskToEdit(null); // close edit form
  };

  const triggerTaskStatus = (taskId, currentStatus) => {
    const getNextStatus = (status) => {
      if (status === "Completed") return "In Progress";
      if (status === "In Progress") return "Pending";
      return "Completed";
    };

    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: getNextStatus(currentStatus) }
        : task
    );

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h2>My Tasks</h2>
      {taskToEdit ? (
        <EditTaskForm task={taskToEdit} onSubmit={handleUpdateTask} />
      ) : (
        <TaskForm onSubmit={handleAddTask} />
      )}
      <div className="tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onComplete={triggerTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}
