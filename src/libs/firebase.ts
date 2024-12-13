import { App, ServiceAccount, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../../serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
}) as App;

export const db = getFirestore(app);

export const auth = getAuth(app);
