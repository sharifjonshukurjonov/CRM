import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus } from "lucide-react"

export default function TeacherAssignmentsPage() {
  // Sample data
  const activeAssignments = [
    {
      id: 1,
      title: "Final Project",
      course: "Introduction to Programming",
      dueDate: "May 25, 2025",
      submissions: "18/32",
    },
    { id: 2, title: "Problem Set 4", course: "Advanced Mathematics", dueDate: "May 22, 2025", submissions: "12/24" },
    { id: 3, title: "Algorithm Analysis", course: "Data Structures", dueDate: "May 28, 2025", submissions: "20/28" },
  ]

  const pastAssignments = [
    {
      id: 4,
      title: "Midterm Project",
      course: "Introduction to Programming",
      dueDate: "Apr 10, 2025",
      submissions: "30/32",
    },
    { id: 5, title: "Problem Set 3", course: "Advanced Mathematics", dueDate: "Apr 15, 2025", submissions: "22/24" },
    {
      id: 6,
      title: "Data Modeling Exercise",
      course: "Data Structures",
      dueDate: "Apr 20, 2025",
      submissions: "26/28",
    },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">Manage and review student assignments.</p>
          </div>
          <Link href="/dashboard/teacher/assignments/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Assignments</TabsTrigger>
            <TabsTrigger value="past">Past Assignments</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      {assignment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Course:</span> {assignment.course}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Due Date:</span> {assignment.dueDate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Submissions:</span> {assignment.submissions}
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="flex h-full flex-col items-center justify-center p-6">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Create Assignment</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Create a new assignment for your students
                </p>
                <Link href="/dashboard/teacher/assignments/create">
                  <Button>Get Started</Button>
                </Link>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-600" />
                      {assignment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Course:</span> {assignment.course}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Due Date:</span> {assignment.dueDate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Submissions:</span> {assignment.submissions}
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </Link>
                      </div>
                    </div>
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
