// /* eslint-disable no-unused-vars */
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Eye, Share2, BookOpen, Users, LogOut } from "lucide-react";
// import { useEffect } from "react";
// import { useStudentStore } from "../store/useStudentStore";
// import { useAuthStore } from "../store/useAuthStore";
// import { useNavigate } from "react-router-dom";

// export default function StudentDashboard() {
//   const {
//     certificates,
//     fetchCertificates,
//     user,
//     shareCertificate,
//     revokeCertificate,
//   } = useStudentStore();

//   const walletId = localStorage.getItem("walletId")
//   console.log(walletId)

//   const { logout } = useAuthStore(); // <-- bring in logout from auth store
//   const navigate = useNavigate();

// useEffect(() => {
//   if (walletId) {
//     fetchCertificates(walletId);
//   }
// }, [walletId, fetchCertificates]);

//   const sharedCertificates = certificates.filter((cert) => cert.isShareable);

//   const handleLogout = () => {
//     logout(); // from useAuthStore
//     navigate("/login"); // redirect to login page
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#f8fafc] p-6 text-gray-900">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-light tracking-tight mb-2 text-gray-800">
//               Student Dashboard
//             </h1>
//             <p className="text-gray-500 text-2xl">
//               Welcome back! Here are your current courses
//             </p>
//           </div>
//           <Button
//             variant="outline"
//             onClick={handleLogout}
//             className="gap-2 border-gray-300 text-gray-600 hover:bg-gray-100"
//           >
//             <LogOut className="h-4 w-4" />
//             Logout
//           </Button>
//         </header>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-full bg-blue-50">
//                 <BookOpen className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-gray-500">My Certificates</h3>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {certificates.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-full bg-purple-50">
//                 <Users className="h-6 w-6 text-purple-600" />
//               </div>
//               <div>
//                 <h3 className="text-gray-500">Shared Certificates</h3>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {sharedCertificates.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* My Courses Section */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
//               <BookOpen className="h-5 w-5 text-blue-600" /> My Certificates
//             </h2>
//             <Button
//               variant="outline"
//               className="border-gray-300 hover:bg-gray-50 text-gray-700"
//             >
//               View All
//             </Button>
//           </div>
//           <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
//             <Table>
//               <TableHeader className="bg-gray-50">
//                 <TableRow>
//                   <TableHead className="w-[80px] text-gray-600">Sr No</TableHead>
//                   <TableHead className="text-gray-600">Course</TableHead>
//                   <TableHead className="text-gray-600">Instructor</TableHead>
//                   <TableHead className="text-right text-gray-600">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {certificates.map((course, index) => (
//                   <TableRow key={course._id} className="hover:bg-gray-50">
//                     <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
//                     <TableCell className="text-gray-800">{course.courseName}</TableCell>
//                     <TableCell className="text-gray-600">{course.instructor || "-"}</TableCell>
//                     <TableCell className="flex justify-end gap-2">
//                       <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
//                         <Eye className="h-4 w-4" /> View
//                       </Button>
//                       {course.isShareable ? (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
//                           onClick={() => revokeCertificate(course._id)}
//                         >
//                           Revoke
//                         </Button>
//                       ) : (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="gap-1 border-gray-300 text-gray-700 hover:bg-gray-50"
//                           onClick={() => shareCertificate(course._id, 86400)} // expiresIn = 1 day
//                         >
//                           <Share2 className="h-4 w-4" /> Share
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </section>

//         {/* Shared With Me Section */}
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
//               <Users className="h-5 w-5 text-purple-600" /> Shared With Me
//             </h2>
//             <Button
//               variant="outline"
//               className="border-gray-300 hover:bg-gray-50 text-gray-700"
//             >
//               View All
//             </Button>
//           </div>
//           <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
//             <Table>
//               <TableHeader className="bg-gray-50">
//                 <TableRow>
//                   <TableHead className="w-[80px] text-gray-600">Sr No</TableHead>
//                   <TableHead className="text-gray-600">Course</TableHead>
//                   <TableHead className="text-gray-600">Shared By</TableHead>
//                   <TableHead className="text-right text-gray-600">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sharedCertificates.map((course, index) => (
//                   <TableRow key={course._id} className="hover:bg-gray-50">
//                     <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
//                     <TableCell className="text-gray-800">{course.courseName}</TableCell>
//                     <TableCell className="text-gray-600">{course.sharedBy || "-"}</TableCell>
//                     <TableCell className="flex justify-end gap-2">
//                       <Button size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white">
//                         <Eye className="h-4 w-4" /> View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }



/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Share2, BookOpen, Users, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function StudentDashboard() {
  const {
    certificates,
    fetchCertificates,
    user,
    shareCertificate,
    revokeCertificate,
  } = useStudentStore();

  const walletId = localStorage.getItem("walletId");

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (walletId) {
      fetchCertificates(walletId);
    }
  }, [walletId, fetchCertificates]);

  const sharedCertificates = certificates.filter((cert) => cert.isShareable);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewCertificate = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Certificate URL not available.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCertificate, setSelectedCertificate] = useState(null);

const handleShare = (certificate) => {
  
  setSelectedCertificate(certificate);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedCertificate(null);
};

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-tight mb-2 text-gray-800">
              Student Dashboard
            </h1>
            <p className="text-gray-500 text-2xl">
              Welcome back! Here are your current courses
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-50">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-500">My Certificates</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {certificates.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-500">Shared Certificates</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {sharedCertificates.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Certificates Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <BookOpen className="h-5 w-5 text-blue-600" /> My Certificates
            </h2>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              View All
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[80px] text-gray-600">Sr No</TableHead>
                  <TableHead className="text-gray-600">Course</TableHead>
                  <TableHead className="text-gray-600">Description</TableHead>
                  <TableHead className=" text-gray-600">Degree</TableHead>
                  <TableHead className=" text-gray-600">IssueDate</TableHead>
                    
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((course, index) => (
                  <TableRow key={course._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
                    <TableCell className="text-gray-800">{course.name}</TableCell>
                    <TableCell className="text-gray-600">{course.description}</TableCell>
                    <TableCell className="text-gray-600">{course.degree}</TableCell>
                    <TableCell className="text-gray-600">{course.issueDate}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleViewCertificate(course.fileUrl)}
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      {course.isShareable ? (
                        <button
  onClick={() => handleShare(course._id)}
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
>
  Revoke
</button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => shareCertificate(course._id, 86400)} // expiresIn = 1 day
                        >
                          <Share2 className="h-4 w-4" /> Share
                        </Button>
                      )}
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
              <Users className="h-5 w-5 text-purple-600" /> Shared By Me
            </h2>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
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
                {sharedCertificates.map((course, index) => (
                  
                  <TableRow key={course._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{index + 1}</TableCell>
                    <TableCell className="text-gray-800">{course.name}</TableCell>
                    <TableCell className="text-gray-600">{course.sharedBy || "-"}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="gap-1 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleViewCertificate(course.fileUrl)}
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      <Transition appear show={isModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-10" onClose={closeModal}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Share Certificate
            </Dialog.Title>

            {selectedCertificate?.fileUrl ? (
              <div className="mt-4 space-y-4">
                <QRCodeCanvas value={selectedCertificate.fileUrl} size={200} />
                <p className="text-sm text-gray-500 break-all">
                  {selectedCertificate.fileUrl}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedCertificate.fileUrl);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Copy Link
                </button>
              </div>
            ) : (
              <p className="text-red-500">Certificate URL not available.</p>
            )}

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}
