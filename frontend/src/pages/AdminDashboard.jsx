import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { User, BookOpen, FileText, GraduationCap, Building, Upload, Plus } from "lucide-react"

export default function InstituteDashboard() {
  const [uploadStudentId, setUploadStudentId] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filterStatus, setFilterStatus] = useState("All")
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: "",
    department: "",
  })

  const students = [
    { id: 1, name: "John Doe", degree: "B.Sc Computer Science", department: "Computer Science", status: "Active" },
    { id: 2, name: "Jane Smith", degree: "B.Tech Information Technology", department: "IT", status: "Active" },
    { id: 3, name: "Robert Johnson", degree: "B.E Electrical", department: "Electrical", status: "Pending" },
    { id: 4, name: "Emily Davis", degree: "M.Sc Physics", department: "Physics", status: "Active" },
  ]

  const courses = [
    { id: 101, name: "Advanced Algorithms", department: "Computer Science", students: 45 },
    { id: 102, name: "Quantum Mechanics", department: "Physics", students: 32 },
    { id: 103, name: "Power Systems", department: "Electrical", students: 28 },
  ]

  const filteredStudents = filterStatus === "All"
    ? students
    : students.filter((student) => student.status === filterStatus)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile || !uploadStudentId) return
    alert(`Uploading certificate for student ${uploadStudentId}`)
    setUploadStudentId(null)
    setSelectedFile(null)
  }

  const handleCreateCourse = (e) => {
    e.preventDefault()
    alert(`Creating course: ${newCourse.name}`)
    setShowCourseModal(false)
    setNewCourse({ name: "", department: "" })
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 justify-center text-gray-800">
            <Building className="h-9 w-9 text-blue-600" /> Institute Dashboard
          </h1>
          <p className="text-gray-500">Administration portal for managing students and courses</p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-50">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-500">Student Details</h3>
                <p className="text-2xl font-bold text-gray-800">{students.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-50">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-500">Courses</h3>
                <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Management Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <User className="h-5 w-5 text-blue-600" /> Student Management
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600">Name</TableHead>
                  <TableHead className="text-gray-600">Degree</TableHead>
                  <TableHead className="text-gray-600">Department</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-right text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <React.Fragment key={student.id}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800">{student.name}</TableCell>
                      <TableCell className="text-gray-700">{student.degree}</TableCell>
                      <TableCell className="text-gray-700">{student.department}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => alert(`Details for ${student.name}`)}
                        >
                          <FileText className="h-4 w-4" /> Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => setUploadStudentId(student.id)}
                        >
                          <GraduationCap className="h-4 w-4" /> Degree
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="text-white"
                        >
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                    {uploadStudentId === student.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-gray-50 p-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="block w-full text-sm text-gray-700
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleUpload}
                                disabled={!selectedFile}
                              >
                                <Upload className="h-4 w-4" /> Upload
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => {
                                  setUploadStudentId(null)
                                  setSelectedFile(null)
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Course Management Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <BookOpen className="h-5 w-5 text-purple-600" /> Course Management
            </h2>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setShowCourseModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> New Course
            </Button>
          </div>

          {/* Course Creation Modal */}
          {showCourseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <form
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 w-full max-w-md shadow-xl"
                onSubmit={handleCreateCourse}
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-600">Create New Course</h3>
                <label className="text-gray-700">
                  Course Name
                  <input
                    type="text"
                    required
                    value={newCourse.name}
                    onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="text-gray-700">
                  Department
                  <input
                    type="text"
                    required
                    value={newCourse.department}
                    onChange={e => setNewCourse({ ...newCourse, department: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <div className="flex gap-2 justify-end mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowCourseModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Create Course
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600">Course Name</TableHead>
                  <TableHead className="text-gray-600">Department</TableHead>
                  <TableHead className="text-right text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{course.name}</TableCell>
                    <TableCell className="text-gray-700">{course.department}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={() => alert(`Details for ${course.name}`)}
                      >
                        <FileText className="h-4 w-4" /> Details
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