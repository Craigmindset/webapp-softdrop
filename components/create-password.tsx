"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface CreatePasswordProps {
  onPasswordCreated: () => void
}

export function CreatePassword({ onPasswordCreated }: CreatePasswordProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error
    setError("")

    // Validate password length (6 digits)
    if (!/^\d{6}$/.test(password)) {
      setError("Password must be exactly 6 digits")
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // In a real app, you would save the password to the database here
    onPasswordCreated()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">Password (6 digits)</Label>
        <Input
          id="password"
          type="password"
          inputMode="numeric"
          placeholder="Enter 6-digit password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          inputMode="numeric"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={6}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  )
}

