"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OtpVerification } from "@/components/otp-verification"
import { CreatePassword } from "@/components/create-password"

export default function SenderSignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp" | "password">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the phone number here
    if (phoneNumber.length >= 10) {
      // Send OTP to the phone number (would be implemented in a real app)
      setStep("otp")
    }
  }

  const handleOtpVerified = () => {
    setStep("password")
  }

  const handlePasswordCreated = () => {
    // In a real app, you would save the user data to the database here
    router.push("/login")
  }

  return (
    <div className="container flex min-h-screen items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign up as Sender</CardTitle>
          <CardDescription>
            {step === "phone" && "Enter your phone number to create an account"}
            {step === "otp" && "Enter the verification code sent to your phone"}
            {step === "password" && "Create a password for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <Button variant="outline" type="button" className="rounded-r-none px-3" disabled>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="rounded-l-none"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          )}

          {step === "otp" && <OtpVerification phoneNumber={phoneNumber} onVerified={handleOtpVerified} />}

          {step === "password" && <CreatePassword onPasswordCreated={handlePasswordCreated} />}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

