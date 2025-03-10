"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock } from "lucide-react"
import Image from "next/image"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if password matches the specified admin password
    if (password === "823911") {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid password. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Admin Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your admin password to continue</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Access Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

