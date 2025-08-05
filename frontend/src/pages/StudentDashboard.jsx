/* eslint-disable no-unused-vars */
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
    <div className="min-h-screen w-full bg-[#f8fafc] p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
          <h1 className="text-4xl font-light tracking-tight mb-2 text-gray-800">Student Dashboard</h1>
          <p className="text-gray-500 text-2xl">Welcome back! Here are your current courses</p>
          </div>
          <div>
              
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-50">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-500">My Courses</h3>
                <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-500">Shared Courses</h3>
                <p className="text-2xl font-bold text-gray-800">{sharedCourses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <BookOpen className="h-5 w-5 text-blue-600" /> My Courses
            </h2>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-gray-700">
              View All
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[80px] text-gray-600">Sr No</TableHead>
                  <TableHead className="text-gray-600">Course</TableHead>
                  <TableHead className="text-gray-600">Instructor</TableHead>
                  <TableHead className="text-right text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={course.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
                    <TableCell className="text-gray-800">{course.name}</TableCell>
                    <TableCell className="text-gray-600">{course.instructor}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 border-gray-300 text-gray-700 hover:bg-gray-50">
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
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <Users className="h-5 w-5 text-purple-600" /> Shared With Me
            </h2>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-gray-700">
              View All
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[80px] text-gray-600">Sr No</TableHead>
                  <TableHead className="text-gray-600">Course</TableHead>
                  <TableHead className="text-gray-600">Shared By</TableHead>
                  <TableHead className="text-right text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sharedCourses.map((course, index) => (
                  <TableRow key={course.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
                    <TableCell className="text-gray-800">{course.name}</TableCell>
                    <TableCell className="text-gray-600">{course.sharedBy}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 border-gray-300 text-gray-700 hover:bg-gray-50">
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