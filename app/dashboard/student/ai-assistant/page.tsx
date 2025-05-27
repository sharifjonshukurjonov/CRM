"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function StudentAIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI learning assistant. How can I help you today? You can ask me questions about your coursework, request explanations of difficult concepts, or get help with problem-solving.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("math") || input.toLowerCase().includes("equation")) {
        response =
          "Let's break down this math problem step by step:\n\n1. First, we need to understand what the problem is asking for\n2. Identify the key variables and relationships\n3. Apply the appropriate formula or method\n4. Work through the solution systematically\n\nFor example, if you're solving a quadratic equation like x² + 5x + 6 = 0:\n\n- We can factor this as (x + 2)(x + 3) = 0\n- Therefore, x = -2 or x = -3\n\nDoes this approach help with your problem? Feel free to share the specific equation you're working on."
      } else if (input.toLowerCase().includes("explain") || input.toLowerCase().includes("concept")) {
        response =
          "I'd be happy to explain this concept!\n\nThe key points to understand are:\n\n1. The fundamental definition and purpose\n2. How it relates to other concepts you've learned\n3. Real-world applications and examples\n4. Common misconceptions\n\nLet me know if you'd like me to elaborate on any particular aspect or if you have specific questions about this topic."
      } else if (input.toLowerCase().includes("help") || input.toLowerCase().includes("assignment")) {
        response =
          "I can definitely help guide you through your assignment. While I can't complete the work for you, I can:\n\n- Help you understand the requirements\n- Break down complex problems into manageable steps\n- Explain relevant concepts\n- Provide examples similar to what you're working on\n- Review your approach and offer suggestions\n\nWhat specific part of the assignment are you finding challenging?"
      } else {
        response =
          "That's an interesting question! To help you better, could you provide a bit more context? For example:\n\n- Which course or subject is this related to?\n- What have you learned about this topic so far?\n- Is there a specific aspect you're finding difficult?\n\nThis will help me tailor my explanation to your current knowledge level."
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const templates = [
    { title: "Explain a Concept", prompt: "Can you explain [concept] in simple terms?" },
    { title: "Help with Homework", prompt: "I need help solving this [subject] problem: [problem details]" },
    { title: "Study Tips", prompt: "What are some effective ways to study for my [subject] exam?" },
    {
      title: "Check My Understanding",
      prompt: "Can you check if my understanding of [concept] is correct? Here's what I think: [your explanation]",
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Learning Assistant</h1>
          <p className="text-muted-foreground">Get help with your coursework, explanations, and study guidance.</p>
        </div>

        <Tabs defaultValue="chat">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="templates">Question Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="space-y-4">
            <Card className="flex h-[calc(100vh-280px)] flex-col">
              <CardHeader className="border-b px-6 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">AI Learning Assistant</CardTitle>
                    <CardDescription>Powered by GPT-4</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="whitespace-pre-line">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2 text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
                          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 animation-delay-200"></div>
                          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 animation-delay-400"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your coursework..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {templates.map((template, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setInput(template.prompt)
                    document.querySelector('button[value="chat"]')?.click()
                  }}
                >
                  <CardHeader>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>Click to use this template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.prompt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
