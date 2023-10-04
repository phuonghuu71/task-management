import firebase from "../firebase.js";
import Task from "../Models/taskModel.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(firebase);

const newTask = (task) => {
  return new Task(
    task.id,
    task.data().name,
    task.data().priority,
    task.data().status,
    task.data().duedate,
    task.data().createdAt
  );
};

// Create a new Task
export const createTask = async (req, res, next) => {
  try {
    const data = req.body;

    let fetchId;

    await addDoc(collection(db, "tasks"), {
      ...data,
      createdAt: new Date().toLocaleString(),
    })
      .then((task) => {
        fetchId = task.id;
      })
      .catch((err) => {
        console.log(err);
      });

    const getTask = doc(db, "tasks", fetchId);
    const getTaskData = await getDoc(getTask);

    if (getTaskData.exists()) {
      res.status(200).send({
        ...getTaskData.data(),
        id: fetchId,
      });
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// Get all Tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getDocs(collection(db, "tasks"));
    const taskArray = [];

    if (tasks.length === 0) {
      res.status(404).send("Task not found");
    } else {
      tasks.forEach((task) => {
        taskArray.push(newTask(task));
      });

      res.status(200).send(taskArray);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// Search tasks
export const searchTasks = async (req, res, next) => {
  const { value } = req.query;

  try {
    const q = query(
      collection(db, "tasks"),
      where("name", ">=", value),
      where("name", "<", value + "z")
    );

    const tasks = await getDocs(q);
    const taskArray = [];

    if (tasks.length === 0) {
      res.status(404).send("Task not found");
    } else {
      tasks.forEach((task) => {
        taskArray.push(newTask(task));
      });

      res.status(200).send(taskArray);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// Filter tasks
// export const filterTasks = async (req, res, next) => {
//   const { type, value } = req.query;

//   try {
//     const q = query(collection(db, "tasks"), where(type, "==", value));

//     const tasks = await getDocs(q);
//     const taskArray = [];

//     if (tasks.length === 0) {
//       res.status(404).send("Task not found");
//     } else {
//       tasks.forEach((task) => {
//         taskArray.push(newTask(task));
//       });

//       res.status(200).send(taskArray);
//     }
//   } catch (err) {
//     res.status(404).send(err.message);
//   }
// };

// Sort tasks
export const sortTasks = async (req, res, next) => {
  const { type, value } = req.query;

  try {
    const q = query(collection(db, "tasks"), orderBy(type, value));

    const tasks = await getDocs(q);
    const taskArray = [];

    if (tasks.length === 0) {
      res.status(404).send("Task not found");
    } else {
      tasks.forEach((task) => {
        taskArray.push(newTask(task));
      });

      res.status(200).send(taskArray);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// Update task by id
export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const task = doc(db, "tasks", id);
    await updateDoc(task, data);

    res.status(200).send({
      ...data,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// Delete task by id
export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    await deleteDoc(doc(db, "tasks", id));

    res.status(200).send("Task delete successfully!");
  } catch (err) {
    res.status(404).send(err.message);
  }
};
