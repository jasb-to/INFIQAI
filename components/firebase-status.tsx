"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { isFirebaseInitialized, getFirebaseInitializationError } from "@/lib/firebase"

export function FirebaseStatus() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check Firebase initialization status
    const checkFirebase = () => {
      const isInit = isFirebaseInitialized()
      const initError = getFirebaseInitializationError()

      setInitialized(isInit)
      setError(initError)
    }

    checkFirebase()

    // Recheck after a short delay to catch any async initialization
    const timer = setTimeout(checkFirebase, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything during SSR
  if (!mounted) {
    return null
  }

  // Don't show anything if Firebase is properly initialized
  if (initialized && !error) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>Firebase Configuration Error:</strong>
        <br />
        {error || "Firebase failed to initialize properly."}
        <br />
        <small className="text-xs mt-2 block">
          Please check your environment variables:
          <br />• NEXT_PUBLIC_FIREBASE_API
          <br />• NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
          <br />• NEXT_PUBLIC_FIREBASE_PROJECT_ID
          <br />• NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
          <br />• NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
          <br />• NEXT_PUBLIC_FIREBASE_APP_ID
        </small>
      </AlertDescription>
    </Alert>
  )
}
