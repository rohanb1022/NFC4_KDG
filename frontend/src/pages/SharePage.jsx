import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios.js";

const SharePage = () => {
  const { hash } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedCertificate = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/user/shared/${hash}`);
        setCertificate(response.data);
      } catch (error) {
        console.error("Error fetching shared certificate:", error);
        setError("Certificate not found or access has been revoked");
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedCertificate();
    }
  }, [hash]);

  const handleViewCertificate = () => {
    if (certificate?.fileUrl) {
      window.open(certificate.fileUrl, "_blank");
    } else {
      toast.error("Certificate file not available");
    }
  };

  const handleDownload = () => {
    if (certificate?.fileUrl) {
      const link = document.createElement("a");
      link.href = certificate.fileUrl;
      link.download = `${certificate.name}_certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("Certificate file not available");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Certificate Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">The requested certificate could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              {certificate.name}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Certificate shared by {certificate.studentName}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Certificate Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Certificate Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student:</span>
                      <span className="font-medium">{certificate.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Degree:</span>
                      <span className="font-medium">{certificate.degree}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issue Date:</span>
                      <span className="font-medium">{certificate.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expiry Date:</span>
                      <span className="font-medium">{certificate.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Course Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course:</span>
                      <span className="font-medium">{certificate.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Description:</span>
                      <span className="font-medium">{certificate.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{certificate.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-medium">{certificate.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t">
              <Button
                onClick={handleViewCertificate}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Eye className="h-4 w-4" />
                View Certificate
              </Button>
              
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
            </div>

            {/* Blockchain Information */}
            {certificate.solanaTx && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Blockchain Verification
                </h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Transaction: {certificate.solanaTx}</div>
                  <div>Certificate Address: {certificate.solanaCertAddress}</div>
                  <div>Hash: {certificate.hash}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SharePage; 