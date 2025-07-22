import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

// Validate required environment variables
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

// Check for missing variables only in browser environment
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (typeof window !== "undefined" && missingVars.length > 0) {
  console.error(`Missing required Firebase environment variables: ${missingVars.join(", ")}`)
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

// Only initialize Firebase in the browser
if (typeof window !== "undefined") {
  try {
    // Check if all required config values are present
    const hasValidConfig = Object.values(firebaseConfig).every((value) => value && value !== "undefined")

    if (!hasValidConfig) {
      console.error("Firebase configuration is incomplete. Please check your environment variables.")
    } else {
      // Initialize Firebase app
      app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

      // Initialize Firebase services
      if (app) {
        auth = getAuth(app)
        db = getFirestore(app)
        storage = getStorage(app)
      }
    }
  } catch (error) {
    console.error("Firebase initialization error:", error)
    // Set services to null on error
    app = null
    auth = null
    db = null
    storage = null
  }
}

export { app, auth, db, storage }

// Helper function to check if Firebase is initialized
export const isFirebaseInitialized = () => {
  return !!(app && auth && db && storage)
}

// Helper function to get Firebase services safely
export const getFirebaseServices = () => {
  if (!isFirebaseInitialized()) {
    throw new Error("Firebase is not initialized. Please check your configuration.")
  }
  return { app, auth, db, storage }
}
