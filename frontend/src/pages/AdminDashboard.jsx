/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, Building, Upload,LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useInstitutionStore } from "../store/useInstitutionStore";

import axios from "axios";

export default function InstituteDashboard() {
  const [uploadStudentId, setUploadStudentId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [certificateData, setCertificateData] = useState({
    name: "",
    degree: "",
    startDate: "",
    endDate: "",
    issueDate: "",
    expiryDate: "",
  });
 const { logout } = useAuthStore();

  const { fetchStudents, students } = useInstitutionStore();

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents =
    filterStatus === "All"
      ? students
      : students.filter((student) => student.status === filterStatus);

      const handleLogout = () => {
    logout();
    navigate("/login");
  };
   

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-row items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 justify-center text-gray-800">
            <Building className="h-9 w-9 text-blue-600" /> Institute Dashboard
          </h1>
          <p className="text-gray-500">
            Administration portal for managing students and courses
          </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 ml-5 border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
           
        </header>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <User className="h-5 w-5 text-blue-600" /> Student Management
            </h2>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600">Name</TableHead>
                  <TableHead className="text-gray-600">Degree</TableHead>
                  <TableHead className="text-gray-600">Department</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-right text-gray-600">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <React.Fragment key={student._id}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {student.degree}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {student.department}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white"
                          onClick={async () => {
                            setUploadStudentId(student._id);
                            try {
                              const res = await axios.get(
                                `http://localhost:3000/api/v1/institute/student/${student.walletId}`
                              );
                              setSelectedStudent(res.data);
                            } catch (err) {
                              console.error("❌ Fetch failed:", err.message);
                            }
                          }}
                        >
                          <GraduationCap className="h-4 w-4" /> Degree
                        </Button>
                      </TableCell>
                    </TableRow>

                    {uploadStudentId === student._id && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <div className="p-4 border rounded-md bg-gray-100">
                            <h3 className="text-lg font-semibold mb-4 text-blue-700">
                              Issue Certificate
                            </h3>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={student.name}
                                  readOnly
                                  className="px-4 py-2 border rounded-md bg-gray-200"
                                />
                                <input
                                  type="text"
                                  value={student.walletId}
                                  readOnly
                                  className="px-4 py-2 border rounded-md bg-gray-200"
                                />

                                <input
                                  type="text"
                                  placeholder="Course Name"
                                  className="px-4 py-2 border rounded-md"
                                  onChange={(e) =>
                                    setCertificateData({
                                      ...certificateData,
                                      name: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="text"
                                  placeholder="Degree Name"
                                  className="px-4 py-2 border rounded-md"
                                  onChange={(e) =>
                                    setCertificateData({
                                      ...certificateData,
                                      degree: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="date"
                                  placeholder="Start Date"
                                  className="px-4 py-2 border rounded-md"
                                  onChange={(e) =>
                                    setCertificateData({
                                      ...certificateData,
                                      startDate: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="date"
                                  placeholder="End Date"
                                  className="px-4 py-2 border rounded-md"
                                  onChange={(e) =>
                                    setCertificateData({
                                      ...certificateData,
                                      endDate: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="date"
                                  placeholder="Issue Date"
                                  className="px-4 py-2 border rounded-md"
                                  onChange={(e) =>
                                    setCertificateData({
                                      ...certificateData,
                                      issueDate: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="date"
                                  placeholder="Expiry Date"
                                  className="px-4 py-2 border rounded-md"
                                  onChange={(e) =>
                                    setCertificateData({
                                      ...certificateData,
                                      expiryDate: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                  }
                                  className="px-4 py-2 border rounded-md col-span-2"
                                />
                              </div>

                            <div className="mt-4 flex gap-3">
                              <Button
                                disabled={!selectedFile}
                                className="bg-blue-600 text-white"
                                onClick={async () => {
                                  const formData = new FormData();
                                  formData.append(
                                    "walletId",
                                    selectedStudent.walletId
                                  );
                                  formData.append(
                                    "studentName",
                                    selectedStudent.name
                                  );
                                  Object.entries(certificateData).forEach(
                                    ([key, value]) =>
                                      formData.append(key, value)
                                  );
                                  formData.append("file", selectedFile);

                                  try {
                                    const res = await axios.post(
                                      "http://localhost:3000/api/v1/institute/issue",
                                      formData,
                                      {
                                        headers: {
                                          "Content-Type":
                                            "multipart/form-data",
                                        },
                                      }
                                    );
                                    alert("✅ Certificate issued!");
                                    setUploadStudentId(null);
                                  } catch (err) {
                                    console.error(
                                      "❌ Certificate issue failed:",
                                      err.message
                                    );
                                  }
                                }}
                              >
                                Issue
                              </Button>

                              <Button
                                variant="outline"
                                onClick={() => {
                                  setUploadStudentId(null);
                                  setSelectedFile(null);
                                  setCertificateData({});
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
      </div>
    </div>
  );
}
