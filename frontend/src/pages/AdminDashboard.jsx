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
import { User, BookOpen, FileText, GraduationCap, Building, Upload } from "lucide-react"

export default function InstituteDashboard() {
  const [uploadStudentId, setUploadStudentId] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

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

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // Handle upload (dummy handler)
  const handleUpload = async () => {
    if (!selectedFile || !uploadStudentId) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("studentId", uploadStudentId);

    try {
      // Replace the URL below with your actual backend endpoint
      const response = await fetch("http://localhost:5000/upload-certificate", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Upload successful!");
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      alert("Upload error!");
    }
    setUploadStudentId(null);
    setSelectedFile(null);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Building className="h-9 w-9 text-blue-400" /> Institute Dashboard
          </h1>
          <p className="text-gray-400">Administration portal for managing students and courses</p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-900/30">
                <User className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-gray-400">Student Details</h3>
                <p className="text-white">{students.length} registered students</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-900/30">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-gray-400">Courses</h3>
                <p className="text-white">{courses.length} active courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Management Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" /> Student Management
            </h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add New Student
            </Button>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table className="bg-gray-900/50">
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Degree</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-right text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <React.Fragment key={student.id}>
                    <TableRow className="border-gray-700 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-gray-100">{student.name}</TableCell>
                      <TableCell className="text-gray-300">{student.degree}</TableCell>
                      <TableCell className="text-gray-300">{student.department}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          student.status === "Active"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                          <FileText className="h-4 w-4" /> Details
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1 bg-green-600 hover:bg-green-700"
                          onClick={() => setUploadStudentId(student.id)}
                        >
                          <GraduationCap className="h-4 w-4" /> Give Degree
                        </Button>
                        <Button variant="destructive" size="sm" className="gap-1">
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                    {uploadStudentId === student.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-gray-800">
                          <div className="flex items-center gap-4">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="text-white"
                            />
                            <Button
                              size="sm"
                              className="gap-1 bg-blue-600 hover:bg-blue-700"
                              onClick={handleUpload}
                              disabled={!selectedFile}
                            >
                              <Upload className="h-4 w-4" /> Upload PDF/Certificate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-gray-200 hover:bg-gray-700"
                              onClick={() => {
                                setUploadStudentId(null)
                                setSelectedFile(null)
                              }}
                            >
                              Cancel
                            </Button>
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
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" /> Course Management
            </h2>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create New Course
            </Button>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table className="bg-gray-900/50">
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="text-gray-300">Course Name</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Students Enrolled</TableHead>
                  <TableHead className="text-right text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="font-medium text-gray-100">{course.name}</TableCell>
                    <TableCell className="text-gray-300">{course.department}</TableCell>
                    <TableCell className="text-gray-300">{course.students}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1 border-gray-600 text-gray-200 hover:bg-gray-700">
                        <Upload className="h-4 w-4" /> Upload Material
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 border-gray-600 text-gray-200 hover:bg-gray-700">
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