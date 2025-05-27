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

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI teaching assistant. How can I help you today? You can ask me to help create lesson plans, generate quiz questions, or provide feedback on student work.",
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

      if (input.toLowerCase().includes("lesson plan")) {
        response =
          "Here's a draft lesson plan for your topic:\n\n1. Introduction (10 mins)\n- Brief overview of the topic\n- Connect to previous knowledge\n- Set learning objectives\n\n2. Main Content (25 mins)\n- Key concept explanation\n- Examples and demonstrations\n- Guided practice\n\n3. Student Activity (15 mins)\n- Group work or individual exercise\n- Application of concepts\n\n4. Assessment (5 mins)\n- Quick quiz or exit ticket\n- Check for understanding\n\n5. Conclusion (5 mins)\n- Summarize key points\n- Preview next lesson\n- Assign homework\n\nWould you like me to elaborate on any section?"
      } else if (input.toLowerCase().includes("quiz") || input.toLowerCase().includes("question")) {
        response =
          "Here are some quiz questions you could use:\n\n1. Multiple Choice: What is the primary function of X in the process of Y?\n   a) To accelerate the reaction\n   b) To slow down the reaction\n   c) To change the direction of the reaction\n   d) To prevent the reaction\n\n2. Short Answer: Explain the relationship between A and B in the context of C.\n\n3. True/False: Statement Z is an accurate description of concept D.\n\n4. Problem-Solving: Given scenario E, how would you apply concept F to solve problem G?\n\nWould you like more questions or different types of questions?"
      } else if (input.toLowerCase().includes("feedback")) {
        response =
          'When providing feedback on student work, consider these elements:\n\n1. Start with positive aspects of their work\n2. Be specific about areas for improvement\n3. Provide actionable suggestions\n4. Connect feedback to learning objectives\n5. End with encouragement\n\nFor example:\n"Your explanation of concept X shows good understanding. To strengthen your analysis, consider how Y relates to Z. Try adding specific examples to illustrate your points. Your conclusion effectively summarizes your main arguments."\n\nWould you like me to generate specific feedback for a particular assignment?'
      } else {
        response =
          "I'd be happy to help with that. Could you provide more details about what you're looking for? I can assist with creating lesson plans, generating quiz questions, providing feedback templates, explaining difficult concepts, or suggesting teaching strategies."
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
    { title: "Create Lesson Plan", prompt: "Help me create a lesson plan for teaching [topic]" },
    { title: "Generate Quiz", prompt: "Generate 5 quiz questions about [topic] for [grade level] students" },
    { title: "Assignment Feedback", prompt: "Help me write feedback for a student assignment on [topic]" },
    { title: "Explain Concept", prompt: "Explain [difficult concept] in simple terms for my students" },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Teaching Assistant</h1>
          <p className="text-muted-foreground">
            Get help with lesson planning, creating assessments, and providing feedback.
          </p>
        </div>

        <Tabs defaultValue="chat">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
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
                    <CardTitle className="text-lg">AI Teaching Assistant</CardTitle>
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
                    placeholder="Type your message..."
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
