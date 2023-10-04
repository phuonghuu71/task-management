import { initializeApp } from "firebase/app";
import config from "./config.js";

import { onRequest } from "firebase-functions/v2/https";

const firebase = onRequest(initializeApp(config.firebaseConfig));

export default firebase;
