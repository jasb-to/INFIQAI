import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
}

// Initialize Firebase
let app
let auth
let db
let storage

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)

  // Connect to emulators in development
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    try {
      // Only connect to emulators if not already connected
      if (!auth._delegate._config.emulator) {
        connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
      }
      if (!db._delegate._databaseId.projectId.includes("localhost")) {
        connectFirestoreEmulator(db, "localhost", 8080)
      }
      if (!storage._delegate._host.includes("localhost")) {
        connectStorageEmulator(storage, "localhost", 9199)
      }
    } catch (error) {
      console.log("Emulator connection failed:", error)
    }
  }
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export { auth, db, storage }

export function isFirebaseInitialized(): boolean {
  return !!(auth && db && storage)
}

export function getFirebaseInitializationError(): string | null {
  if (!auth) return "Firebase Auth not initialized"
  if (!db) return "Firestore not initialized"
  if (!storage) return "Firebase Storage not initialized"
  return null
}
