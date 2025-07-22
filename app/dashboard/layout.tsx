"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Wait for client-side hydration
        if (typeof window === "undefined") return

        // Dynamic import to avoid SSR issues
        const { auth, isFirebaseInitialized } = await import("@/lib/firebase")

        if (!isFirebaseInitialized()) {
          setAuthError("Firebase is not properly configured. Please check your environment variables.")
          setLoading(false)
          return
        }

        if (!auth) {
          setAuthError("Firebase authentication service is not available")
          setLoading(false)
          return
        }

        const { onAuthStateChanged } = await import("firebase/auth")

        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (!user) {
              router.push("/auth/login")
            } else {
              setLoading(false)
            }
          },
          (error) => {
            console.error("Auth state change error:", error)
            setAuthError(`Authentication error: ${error.message}`)
            setLoading(false)
          },
        )

        return () => unsubscribe()
      } catch (error: any) {
        console.error("Firebase initialization error:", error)
        setAuthError(`Failed to initialize authentication: ${error.message}`)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [router])

  if (authError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mt-2">
              <strong>Configuration Error:</strong>
              <br />
              {authError}
              <br />
              <br />
              Please check your Firebase configuration in the environment variables.
              <br />
              <br />
              Required variables:
              <ul className="list-disc list-inside mt-2 text-xs">
                <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
                <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
                <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
                <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
