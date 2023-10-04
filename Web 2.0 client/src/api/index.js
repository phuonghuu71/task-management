import axios from "axios";

const API = axios.create({ baseURL: "https://us-central1-task-management-1863b.cloudfunctions.net/default" });

// Task
export const getTask = () => {
  return API.get("/task");
};

export const createTask = (newTask) => API.post("/task/new", newTask);

export const updateTask = (updatedTask) =>
  API.put(`/task/update/${updatedTask.id}`, updatedTask);

export const deleteTask = (id) => API.delete(`/task/delete/${id}`, id);

export const searchTasks = (search) => API.get(`/task/search?value=${search}`);

export const filterTasks = (filter) =>
  API.get(`/task/filter?type=${filter.type}&value=${filter.value}`, filter);

export const sortTasks = (sort) => API.get(`/task/sort?type=${sort.type}&value=${sort.value}`, sort);
