"use client"

import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyB4ZbINhUsGMLq6aKP7IAejuh7CKtVwtbk",
  authDomain: "productcatlogue.firebaseapp.com",
  databaseURL: "https://productcatlogue-default-rtdb.firebaseio.com",
  projectId: "productcatlogue",
  storageBucket: "productcatlogue.firebasestorage.app",
  messagingSenderId: "59201251761",
  appId: "1:59201251761:web:cb68b65c73d727d8c5f590",
  measurementId: "G-P61MBXJRRY",
}

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication and get a reference to the service
export const auth = typeof window !== "undefined" ? getAuth(app) : null
export const googleProvider = typeof window !== "undefined" ? new GoogleAuthProvider() : null

// Initialize Realtime Database and get a reference to the service
export const database = typeof window !== "undefined" ? getDatabase(app) : null

export default app
