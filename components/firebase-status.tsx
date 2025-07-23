"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface FirebaseStatus {
  initialized: boolean
  auth: boolean
  firestore: boolean
  storage: boolean
  error?: string
}

export function FirebaseStatus() {
  const [status, setStatus] = useState<FirebaseStatus>({
    initialized: false,
    auth: false,
    firestore: false,
    storage: false,
  })

  useEffect(() => {
    const checkFirebaseStatus = async () => {
      try {
        // Only check in browser environment
        if (typeof window === "undefined") return

        // Try to import Firebase modules
        const { auth, db, storage, isFirebaseInitialized } = await import("@/lib/firebase")

        const initialized = isFirebaseInitialized()

        setStatus({
          initialized,
          auth: !!auth,
          firestore: !!db,
          storage: !!storage,
        })
      } catch (error: any) {
        console.error("Firebase status check error:", error)
        setStatus({
          initialized: false,
          auth: false,
          firestore: false,
          storage: false,
          error: error.message,
        })
      }
    }

    checkFirebaseStatus()
  }, [])

  if (status.error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Firebase Configuration Error:</strong>
          <br />
          {status.error}
          <br />
          <br />
          Please check your environment variables:
          <ul className="list-disc list-inside mt-2 text-xs">
            <li>NEXT_PUBLIC_FIREBASE_API</li>
            <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
            <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
            <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
            <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
            <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
          </ul>
        </AlertDescription>
      </Alert>
    )
  }

  const allServicesReady = status.initialized && status.auth && status.firestore && status.storage

  return (
    <Alert variant={allServicesReady ? "default" : "destructive"}>
      {allServicesReady ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4" />}
      <AlertDescription>
        <strong>Firebase Services Status:</strong>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2">
            {status.initialized ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
            Firebase App: {status.initialized ? "Initialized" : "Not initialized"}
          </li>
          <li className="flex items-center gap-2">
            {status.auth ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
            Authentication: {status.auth ? "Ready" : "Not configured"}
          </li>
          <li className="flex items-center gap-2">
            {status.firestore ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
            Firestore: {status.firestore ? "Ready" : "Not configured"}
          </li>
          <li className="flex items-center gap-2">
            {status.storage ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
            Storage: {status.storage ? "Ready" : "Not configured"}
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}
