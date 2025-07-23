"use client"

import type React from "react"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FirebaseStatus } from "@/components/firebase-status"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!auth) {
        throw new Error("Firebase auth not initialized")
      }

      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)

      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password. Please check your credentials and try again.")
          break
        case "auth/user-not-found":
          setError("No account found with this email address.")
          break
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.")
          break
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.")
          break
        default:
          setError("Login failed. Please try again or contact support if the problem persists.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">INFIQAI</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <FirebaseStatus />

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
