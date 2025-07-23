import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

// Global variables to store Firebase instances
let firebaseApp: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null
let initializationError: string | null = null

// Check if we're in the browser
const isBrowser = typeof window !== "undefined"

function getFirebaseConfig(): FirebaseConfig | null {
  if (!isBrowser) return null

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  // Check if all required environment variables are present
  const missingVars = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`)

  if (missingVars.length > 0) {
    const error = `Missing required Firebase environment variables: ${missingVars.join(", ")}`
    console.error(error)
    initializationError = error
    return null
  }

  return config as FirebaseConfig
}

function initializeFirebase(): boolean {
  if (!isBrowser) return false

  try {
    // If already initialized, return true
    if (firebaseApp && auth && db && storage) {
      return true
    }

    const config = getFirebaseConfig()
    if (!config) {
      return false
    }

    // Initialize Firebase app
    firebaseApp = getApps().length === 0 ? initializeApp(config) : getApp()

    // Initialize Firebase services
    auth = getAuth(firebaseApp)
    db = getFirestore(firebaseApp)
    storage = getStorage(firebaseApp)

    console.log("Firebase initialized successfully")
    initializationError = null
    return true
  } catch (error) {
    const errorMessage = `Firebase initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`
    console.error(errorMessage)
    initializationError = errorMessage
    return false
  }
}

// Initialize Firebase immediately if in browser
if (isBrowser) {
  initializeFirebase()
}

// Export functions to get Firebase instances
export function getFirebaseAuth(): Auth | null {
  if (!isBrowser) return null
  if (!auth) initializeFirebase()
  return auth
}

export function getFirebaseFirestore(): Firestore | null {
  if (!isBrowser) return null
  if (!db) initializeFirebase()
  return db
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (!isBrowser) return null
  if (!storage) initializeFirebase()
  return storage
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isBrowser) return null
  if (!firebaseApp) initializeFirebase()
  return firebaseApp
}

// Export utility functions
export function isFirebaseInitialized(): boolean {
  if (!isBrowser) return false
  return !!(firebaseApp && auth && db && storage && !initializationError)
}

export function getFirebaseInitializationError(): string | null {
  return initializationError
}

// Export the instances directly (with null checks)
export { auth, db, storage, firebaseApp }
