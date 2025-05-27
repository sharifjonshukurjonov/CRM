import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, GraduationCap, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">EduAI</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Modern Learning Platform with AI Integration</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Enhance teaching and learning with our AI-powered platform that connects teachers and students in an
            interactive environment.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register?role=teacher">
              <Button size="lg" className="gap-2">
                <GraduationCap className="h-5 w-5" />
                Join as Teacher
              </Button>
            </Link>
            <Link href="/register?role=student">
              <Button size="lg" variant="outline" className="gap-2">
                <Users className="h-5 w-5" />
                Join as Student
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Create and manage courses, assignments, and materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Teachers can easily create classes, assign tasks, and grade submissions. Students can join classes and
                submit their work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>AI Assistance</CardTitle>
              <CardDescription>Get help from AI for questions and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Integrated ChatGPT helps students with questions and provides teachers with automated feedback
                suggestions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>Tailored experiences for teachers and students</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Different interfaces and permissions for teachers and students, ensuring everyone has the tools they
                need.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-sm border">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                For Teachers
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <p>Create classes and subjects</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <p>Assign tasks and view submissions</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <p>Grade student work</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    4
                  </div>
                  <p>Get AI-assisted feedback suggestions</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                For Students
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <p>Join classes with enrollment codes</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <p>View and submit assignments</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <p>Ask questions to AI assistant</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    4
                  </div>
                  <p>Track progress and view grades</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 EduAI Learning Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
