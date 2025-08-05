import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Share2, BookOpen, Users } from "lucide-react"

export default function StudentDashboard() {
  const courses = [
    { id: 1, name: "Introduction to Computer Science", instructor: "Dr. Smith" },
    { id: 2, name: "Data Structures and Algorithms", instructor: "Prof. Johnson" },
    { id: 3, name: "Web Development Fundamentals", instructor: "Dr. Lee" },
    { id: 4, name: "Database Management Systems", instructor: "Prof. Brown" },
  ]

  const sharedCourses = [
    { id: 101, name: "Calculus I", sharedBy: "Alice" },
    { id: 102, name: "Physics Lab", sharedBy: "Bob" },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here are your current courses</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-900/30">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-gray-400">My Courses</h3>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-900/30">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-gray-400">Shared Courses</h3>
                <p className="text-2xl font-bold">{sharedCourses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" /> My Courses
            </h2>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-black">
              View All
            </Button>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table className="bg-gray-900/50">
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="w-[80px] text-gray-300 text-left">Sr No</TableHead>
                  <TableHead className="text-gray-300 text-left">Course</TableHead>
                  <TableHead className="text-right text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={course.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="font-medium text-gray-200 text-left">{index + 1}</TableCell>
                    <TableCell className="text-gray-100 text-left">{course.name}</TableCell>
                    <TableCell className="flex justify-end gap-2 text-right">
                      <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      <Button size="sm" className="gap-1 bg-blue-800 hover:bg-blue-900 text-white">
                        <Share2 className="h-4 w-4" /> Share
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Shared With Me Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" /> Shared With Me
            </h2>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-black">
              View All
            </Button>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table className="bg-gray-900/50">
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="w-[80px] text-gray-300 text-left">Sr No</TableHead>
                  <TableHead className="text-gray-300 text-left">Course</TableHead>
                  <TableHead className="text-right text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sharedCourses.map((course, index) => (
                  <TableRow key={course.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="font-medium text-gray-200 text-left">{index + 1}</TableCell>
                    <TableCell className="text-gray-100 text-left">{course.name}</TableCell>
                    <TableCell className="flex justify-end gap-2 text-right">
                      <Button size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      <Button size="sm" className="gap-1 bg-purple-800 hover:bg-purple-900 text-white">
                        <Share2 className="h-4 w-4" /> Share
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  )
}