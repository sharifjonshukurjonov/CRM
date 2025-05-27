import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, FileText, Plus } from "lucide-react"

export default function StudentDashboard() {
  // Sample data
  const stats = [
    { title: "Enrolled Courses", value: "4", icon: BookOpen, color: "text-blue-500" },
    { title: "Completed Assignments", value: "18", icon: FileText, color: "text-green-500" },
    { title: "Pending Assignments", value: "5", icon: Clock, color: "text-orange-500" },
  ]

  const enrolledCourses = [
    { id: 1, name: "Introduction to Programming", progress: 75, teacher: "Prof. Johnson" },
    { id: 2, name: "Advanced Mathematics", progress: 60, teacher: "Dr. Smith" },
    { id: 3, name: "Data Structures", progress: 40, teacher: "Prof. Williams" },
  ]

  const upcomingAssignments = [
    { id: 1, title: "Final Project", course: "Introduction to Programming", dueDate: "May 25, 2025" },
    { id: 2, title: "Problem Set 4", course: "Advanced Mathematics", dueDate: "May 22, 2025" },
    { id: 3, title: "Algorithm Analysis", course: "Data Structures", dueDate: "May 28, 2025" },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your learning progress.</p>
          </div>
          <Link href="/dashboard/student/courses/browse">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Join New Course
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
            <TabsTrigger value="assignments">Upcoming Assignments</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>Taught by {course.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/dashboard/student/courses/${course.id}`}>
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
                <h3 className="mb-2 text-xl font-medium">Join New Course</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Enroll in a new course with an enrollment code
                </p>
                <Link href="/dashboard/student/courses/browse">
                  <Button>Browse Courses</Button>
                </Link>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="assignments" className="space-y-4">
            <div className="rounded-lg border bg-card">
              <div className="grid grid-cols-1 divide-y">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Due: {assignment.dueDate}</div>
                        <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            View
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
