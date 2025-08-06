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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Eye, Share2, BookOpen, Users, LogOut, Copy, LinkIcon, FileText, PlayCircle, Twitter, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  // State for share dialog
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (walletId) {
      fetchCertificates(walletId);
    }
  }, [walletId, fetchCertificates]);

  // Debug selectedCertificate changes
  useEffect(() => {
    console.log("selectedCertificate changed:", selectedCertificate);
  }, [selectedCertificate]);

  const sharedCertificates = certificates.filter((cert) => cert.isShareable);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewCertificate = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      toast.error("Certificate URL not available.");
    }
  };

  const handleShare = async (certificate) => {
    console.log("Starting share process for certificate:", certificate);
    setSelectedCertificate(certificate);
    setIsSharing(true);
    try {
      const response = await shareCertificate(certificate._id, 24 * 60 * 60 * 1000); // 24 hours
      console.log("Share response:", response);
      
      // Create the share link using the hash from the response
      const shareLink = `${window.location.origin}/share/${response.link}`;
      console.log("Generated share link:", shareLink);
      
      // Update the selected certificate with the share link
      const updatedCertificate = {
        ...certificate,
        isShareable: true,
        shareLink,
        link: response.link
      };
      console.log("Updated certificate:", updatedCertificate);
      
      setSelectedCertificate(updatedCertificate);
      setIsShareDialogOpen(true);
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Failed to share certificate");
    } finally {
      setIsSharing(false);
    }
  };

  const handleUnshare = async () => {
    if (!selectedCertificate) return;
    
    setIsSharing(true);
    try {
      await revokeCertificate(selectedCertificate._id);
      setIsShareDialogOpen(false);
      setSelectedCertificate(null);
      toast.success("Certificate unshared successfully");
    } catch (error) {
      toast.error("Failed to unshare certificate");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCertificate) return;
    
    setIsDeleting(true);
    try {
      await revokeCertificate(selectedCertificate._id);
      setIsDeleteDialogOpen(false);
      setSelectedCertificate(null);
      toast.success("Certificate revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke certificate");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = async () => {
    const linkToCopy = selectedCertificate?.shareLink;
    if (!linkToCopy) {
      toast.error("No shareable link available", {
        duration: 2000,
        position: "bottom-center",
        style: {
          background: "#EF4444",
          color: "white",
          border: "none",
        },
      });
      return;
    }
    
    try {
      await navigator.clipboard.writeText(linkToCopy);
      toast.success("Shareable link copied to clipboard!", {
        duration: 2000,
        position: "bottom-center",
        style: {
          background: "#10B981",
          color: "white",
          border: "none",
        },
      });
    } catch (error) {
      toast.error("Failed to copy link", {
        duration: 2000,
        position: "bottom-center",
        style: {
          background: "#EF4444",
          color: "white",
          border: "none",
        },
      });
    }
  };

  const renderIcon = (type) => {
    const iconClasses = "h-5 w-5";
    switch (type) {
      case "article":
        return <FileText className={`${iconClasses} text-sky-500`} />;
      case "video":
        return <PlayCircle className={`${iconClasses} text-purple-500`} />;
      case "social":
        return <Twitter className={`${iconClasses} text-blue-500`} />;
      default:
        return <FileText className={`${iconClasses} text-muted-foreground`} />;
    }
  };

  const getTagColorClass = (index) => {
    const tagColors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    ];
    return tagColors[index % tagColors.length];
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
                  <TableHead className="text-gray-600">Degree</TableHead>
                  <TableHead className="text-gray-600">IssueDate</TableHead>
                  <TableHead className="text-right text-gray-600">Actions</TableHead>
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
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                          onClick={async () => {
                            try {
                              await revokeCertificate(course._id);
                              toast.success("Certificate revoked successfully");
                            } catch (error) {
                              toast.error("Failed to revoke certificate");
                            }
                          }}
                        >
                          Revoke
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => handleShare(course)}
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
                    <TableCell className="text-gray-600">{course.sharedBy || "Me"}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="gap-1 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleViewCertificate(course.fileUrl)}
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Certificate</DialogTitle>
            <DialogDescription>
              Share this certificate with others using the link below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <input
              type="text"
              value={selectedCertificate?.shareLink || ""}
              placeholder={isSharing ? "Generating share link..." : "Share link will appear here"}
              readOnly
              className="flex-1 bg-transparent border-none outline-none text-sm font-mono"
              onChange={(e) => console.log("Input value changed:", e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="hover:bg-background transition-colors"
              title="Copy to clipboard"
              disabled={!selectedCertificate?.shareLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleUnshare}
              disabled={isSharing}
            >
              {isSharing ? "Unsharing..." : "Unshare"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog for Revoke */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently revoke the shared access for
              "{selectedCertificate?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Revoking..." : "Revoke"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
