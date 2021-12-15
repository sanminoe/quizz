import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
};

const app = initializeApp(clientCredentials);

const database = getDatabase(app, process.env.NEXT_PUBLIC_FIREBASE_DB_URL);

export { app, database };
