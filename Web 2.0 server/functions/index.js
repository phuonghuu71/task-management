import express from "express";
import cors from "cors";

import config from "./config.js";

// Routes
import taskRoute from "./Routes/taskRoute.js";

import * as functions from "firebase-functions";

const app = express();

app.use(cors());
app.use(express.json());

// Using routes
app.use("/task", taskRoute);

app.listen(config.port, () =>
  console.log(`Server is running at ${config.hostUrl}`)
);

const App = functions.https.onRequest(app);

export default App;
