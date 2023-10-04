import express from "express";

import {
  createTask,
  getTasks,
  searchTasks,
  // filterTasks,
  sortTasks,
  updateTask,
  deleteTask,
} from "../Controllers/taskControllers.js";

const router = express.Router();

router.post("/new", createTask);
router.get("/", getTasks);
router.get('/search', searchTasks);
// router.get("/filter", filterTasks);
router.get("/sort", sortTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
