import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, FileText } from "lucide-react"

export default function StudentAssignmentsPage() {
  // Sample data
  const pendingAssignments = [
    {
      id: 1,
      title: "Final Project",
      course: "Introduction to Programming",
      dueDate: "May 25, 2025",
      status: "Not Started",
    },
    { id: 2, title: "Problem Set 4", course: "Advanced Mathematics", dueDate: "May 22, 2025", status: "In Progress" },
    { id: 3, title: "Algorithm Analysis", course: "Data Structures", dueDate: "May 28, 2025", status: "Not Started" },
  ]

  const completedAssignments = [
    { id: 4, title: "Midterm Project", course: "Introduction to Programming", dueDate: "Apr 10, 2025", grade: "A" },
    { id: 5, title: "Problem Set 3", course: "Advanced Mathematics", dueDate: "Apr 15, 2025", grade: "B+" },
    { id: 6, title: "Data Modeling Exercise", course: "Data Structures", dueDate: "Apr 20, 2025", grade: "A-" },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">View and submit your course assignments.</p>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending Assignments</TabsTrigger>
            <TabsTrigger value="completed">Completed Assignments</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingAssignments.map((assignment) => (
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
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Status:</span>
                        <Badge variant={assignment.status === "In Progress" ? "outline" : "secondary"}>
                          {assignment.status === "In Progress" ? <Clock className="mr-1 h-3 w-3" /> : null}
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            {assignment.status === "In Progress" ? "Continue" : "Start"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {assignment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Course:</span> {assignment.course}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Submitted:</span> {assignment.dueDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Grade:</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {assignment.grade}
                        </Badge>
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            View Feedback
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
