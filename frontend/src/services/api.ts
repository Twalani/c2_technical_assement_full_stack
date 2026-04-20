import { apiClient } from "./apiClient";
import { Task } from "../types/task";

// GET ALL
export const getTasks = async (): Promise<Task[]> => {
  const res = await apiClient.get("/tasks");
  return res.data;
};

// CREATE
export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await apiClient.post("/tasks", task);
  return res.data;
};

// DELETE
export const deleteTask = async (id: number) => {
  await apiClient.delete(`/tasks/${id}`);
};

// UPDATE
export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const res = await apiClient.put(`/tasks/${id}`, task);
  return res.data;
};