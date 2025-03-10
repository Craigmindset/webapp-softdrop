"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OtpVerificationProps {
  phoneNumber: string
  onVerified: () => void
}

export function OtpVerification({ phoneNumber, onVerified }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (isNaN(Number(value)) && value !== "") {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => val === "")
    const inputToFocus = document.getElementById(`otp-${nextEmptyIndex !== -1 ? nextEmptyIndex : 5}`)
    if (inputToFocus) {
      inputToFocus.focus()
    }
  }

  const handleResendOtp = () => {
    setIsResending(true)
    // In a real app, you would call an API to resend the OTP
    setTimeout(() => {
      setTimeLeft(120)
      setIsResending(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")

    // In a real app, you would validate the OTP with an API call
    if (otpValue.length === 6) {
      // For demo purposes, any 6-digit code is accepted
      onVerified()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp-0">Verification Code</Label>
        <p className="text-sm text-muted-foreground">We've sent a 6-digit code to {phoneNumber}</p>
        <div className="grid grid-cols-6 gap-1 xs:gap-2 sm:flex sm:justify-between sm:gap-2 px-1">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-10 sm:h-12 w-full sm:w-12 text-center text-lg p-0 sm:p-2"
              maxLength={1}
              autoComplete="one-time-code"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {timeLeft > 0 ? (
            <span>Resend code in {formatTime(timeLeft)}</span>
          ) : (
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto"
              onClick={handleResendOtp}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend code"}
            </Button>
          )}
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={otp.some((digit) => digit === "")}>
        Verify
      </Button>
    </form>
  )
}

