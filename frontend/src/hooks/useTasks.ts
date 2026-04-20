import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { getTasks, addTask, deleteTask, updateTask } from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  // ADD (instant update)
  const handleAdd = async (title: string, description: string) => {
    const newTask = await addTask({
      title,
      description,
      completed: false,
    });

    setTasks((prev) => [...prev, newTask]);
  };

  // DELETE (instant update)
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // TOGGLE (instant update)
  const toggleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );
  };

  // EDIT state
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // EDIT (instant update)
  const saveEdit = async (task: Task) => {
    const updated = await updateTask(task.id, {
      ...task,
      title: editTitle,
      description: editDescription,
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );

    cancelEdit();
  };

  return {
    tasks,
    handleAdd,
    handleDelete,
    toggleComplete,

    editingTaskId,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,

    startEdit,
    cancelEdit,
    saveEdit,
  };
}