import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp
let auth: Auth
let db: Firestore
let initializationError: string | null = null

try {
  // Initialize Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  auth = getAuth(app)
  db = getFirestore(app)
} catch (error) {
  console.error("Firebase initialization error:", error)
  initializationError = error instanceof Error ? error.message : "Unknown Firebase initialization error"
}

// Helper functions to check Firebase status
export function isFirebaseInitialized(): boolean {
  return initializationError === null && !!app && !!auth && !!db
}

export function getFirebaseInitializationError(): string | null {
  return initializationError
}

export { app, auth, db }
