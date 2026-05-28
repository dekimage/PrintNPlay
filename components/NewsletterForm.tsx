"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        })
        setEmail("")
      } else {
        const data = await response.json()
        const detail =
          typeof data.details === "string" ? `: ${data.details}` : ""
        throw new Error((data.error || "Failed to subscribe") + detail)
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <div className="flex-1 min-w-0">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 w-full"
          disabled={isLoading}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full shrink-0 bg-white text-black hover:bg-white/90 font-medium sm:w-auto"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Mail className="w-4 h-4 mr-2" />
            Subscribe
          </>
        )}
      </Button>
    </form>
  )
}
