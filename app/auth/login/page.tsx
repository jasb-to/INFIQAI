"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Basic validation
    if (!email.trim()) {
      setError("Please enter your email address.")
      setLoading(false)
      return
    }

    if (!password.trim()) {
      setError("Please enter your password.")
      setLoading(false)
      return
    }

    // Demo authentication - simulate API call
    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo credentials check
      if (email.toLowerCase() === "demo@infiqai.com" && password === "demo123456") {
        console.log("Demo login successful")
        // Store demo user info in localStorage for demo purposes
        localStorage.setItem(
          "infiqai_user",
          JSON.stringify({
            email: "demo@infiqai.com",
            name: "Demo User",
            role: "user",
            uid: "demo-user-123",
          }),
        )
        router.push("/dashboard")
        return
      }

      if (email.toLowerCase() === "admin@infiqai.com" && password === "admin123456") {
        console.log("Admin login successful")
        // Store admin user info in localStorage for demo purposes
        localStorage.setItem(
          "infiqai_user",
          JSON.stringify({
            email: "admin@infiqai.com",
            name: "Admin User",
            role: "admin",
            uid: "admin-user-123",
          }),
        )
        router.push("/dashboard/admin")
        return
      }

      // For any other credentials, show error
      setError("Invalid email or password. Use demo@infiqai.com / demo123456 or admin@infiqai.com / admin123456")
    } catch (error: any) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Demo login function for testing
  const handleDemoLogin = () => {
    setEmail("demo@infiqai.com")
    setPassword("demo123456")
    setError("")
  }

  const handleAdminLogin = () => {
    setEmail("admin@infiqai.com")
    setPassword("admin123456")
    setError("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in to INFIQAI</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-3 font-medium">Demo Credentials:</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white"
                    onClick={handleDemoLogin}
                    disabled={loading}
                  >
                    Demo User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white"
                    onClick={handleAdminLogin}
                    disabled={loading}
                  >
                    Admin User
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>

              <div className="text-center">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
