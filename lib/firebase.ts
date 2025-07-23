import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

// Check if we're in the browser
if (typeof window !== "undefined") {
  try {
    // Initialize Firebase only if it hasn't been initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    // Initialize services
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
}

// Export the services
export { auth, db, storage }

// Helper functions
export const isFirebaseInitialized = () => {
  return typeof window !== "undefined" && !!auth && !!db && !!storage
}

export const getFirebaseInitializationError = () => {
  if (typeof window === "undefined") {
    return "Firebase can only be initialized on the client side"
  }

  const requiredEnvVars = [
    "NEXT_PUBLIC_FIREBASE_API",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    return `Missing required Firebase environment variables: ${missingVars.join(", ")}`
  }

  return null
}
