"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"

const MIN_MESSAGE_LENGTH = 10

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      toast({
        title: "Message too short",
        description: `Please write at least ${MIN_MESSAGE_LENGTH} characters in your message.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        const data = await response.json()
        const detail =
          typeof data.details === "string" ? `: ${data.details}` : ""
        throw new Error((data.error || "Failed to send message") + detail)
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          placeholder="Your name"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          placeholder="your@email.com"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          placeholder="What is this about?"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          minLength={MIN_MESSAGE_LENGTH}
          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
          placeholder="Tell us how we can help you..."
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-white/50">
          {formData.message.trim().length}/{MIN_MESSAGE_LENGTH} characters minimum
        </p>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-white text-black hover:bg-white/90 font-medium">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
