"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isFirebaseInitialized, getFirebaseInitializationError } from "@/lib/firebase"

export function FirebaseStatus() {
  const [status, setStatus] = useState<"loading" | "initialized" | "error">("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkFirebase = () => {
      const initError = getFirebaseInitializationError()

      if (initError) {
        setStatus("error")
        setError(initError)
        return
      }

      if (isFirebaseInitialized()) {
        setStatus("initialized")
        setError(null)
      } else {
        setStatus("error")
        setError("Firebase services not properly initialized")
      }
    }

    // Check immediately
    checkFirebase()

    // Check again after a short delay to ensure client-side initialization
    const timer = setTimeout(checkFirebase, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (status === "loading") {
    return (
      <Alert>
        <AlertDescription>Initializing Firebase services...</AlertDescription>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertDescription>Firebase initialization error: {error}</AlertDescription>
      </Alert>
    )
  }

  return null // Don't show anything when Firebase is working properly
}
