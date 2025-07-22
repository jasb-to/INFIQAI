// Only import and initialize Firebase Admin on the server side
let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

// Check if we're on the server side
if (typeof window === "undefined") {
  try {
    const { initializeApp, getApps, cert } = require("firebase-admin/app")
    const { getAuth } = require("firebase-admin/auth")
    const { getFirestore } = require("firebase-admin/firestore")
    const { getStorage } = require("firebase-admin/storage")

    // Parse the service account key JSON
    const serviceAccountKey = process.env.FIREBASE_ADMIN_KEY

    if (serviceAccountKey) {
      const serviceAccount = JSON.parse(serviceAccountKey)

      // Initialize Firebase Admin
      const apps = getApps()
      app = !apps.length
        ? initializeApp({
            credential: cert(serviceAccount),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          })
        : apps[0]

      auth = getAuth(app)
      db = getFirestore(app)
      storage = getStorage(app)
    } else {
      console.warn("Firebase Admin SDK not initialized: Missing FIREBASE_ADMIN_KEY")
    }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error)
  }
}

export { app, auth, db, storage }
