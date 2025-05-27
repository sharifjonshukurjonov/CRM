import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, FileText, Plus, Users } from "lucide-react"

export default function TeacherDashboard() {
  // Sample data
  const stats = [
    { title: "Active Courses", value: "5", icon: BookOpen, color: "text-blue-500" },
    { title: "Total Students", value: "124", icon: Users, color: "text-green-500" },
    { title: "Pending Assignments", value: "12", icon: FileText, color: "text-orange-500" },
    { title: "Hours Taught", value: "87", icon: Clock, color: "text-purple-500" },
  ]

  const recentCourses = [
    { id: 1, name: "Introduction to Programming", students: 32, assignments: 8 },
    { id: 2, name: "Advanced Mathematics", students: 24, assignments: 6 },
    { id: 3, name: "Data Structures", students: 28, assignments: 10 },
  ]

  const pendingAssignments = [
    { id: 1, title: "Final Project", course: "Introduction to Programming", submissions: 18, dueDate: "May 25, 2025" },
    { id: 2, title: "Problem Set 4", course: "Advanced Mathematics", submissions: 12, dueDate: "May 22, 2025" },
    { id: 3, title: "Algorithm Analysis", course: "Data Structures", submissions: 20, dueDate: "May 28, 2025" },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your teaching activities.</p>
          </div>
          <Link href="/dashboard/teacher/courses/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Pending Assignments</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.students} students enrolled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{course.assignments} assignments</span>
                      </div>
                      <Link href={`/dashboard/teacher/courses/${course.id}`}>
                        <Button variant="ghost" size="sm">
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="flex h-full flex-col items-center justify-center p-6">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Create New Course</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">Add a new course for your students</p>
                <Link href="/dashboard/teacher/courses/create">
                  <Button>Get Started</Button>
                </Link>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="assignments" className="space-y-4">
            <div className="rounded-lg border bg-card">
              <div className="grid grid-cols-1 divide-y">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.course} • {assignment.submissions} submissions
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Due: {assignment.dueDate}</div>
                        <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
