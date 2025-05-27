"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function CreateCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate course creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Course created successfully",
        description: "Your new course has been created.",
      })

      router.push("/dashboard/teacher/courses")
    }, 1500)
  }

  return (
    <DashboardLayout role="teacher">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
          <p className="text-muted-foreground">Set up a new course for your students to enroll in.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>Provide the basic information about your course.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="e.g. Introduction to Computer Science" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of the course content and objectives"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Area</Label>
                    <Input id="subject" placeholder="e.g. Computer Science" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Course Level</Label>
                    <Input id="level" placeholder="e.g. Beginner, Intermediate, Advanced" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" required />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Course"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
