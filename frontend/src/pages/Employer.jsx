import React from 'react';
import { Check, User, Calendar, Download, Share2 } from 'lucide-react';

const SharedCertificateScreen = () => {
  // Certificate data (would normally come from API)
  const certificateData = {
    fileName: "Web_Development_Certificate.pdf",
    sharedBy: "Suhas",
    dateShared: "05/08/2025",
    viewed: true,
    downloadUrl: "#"
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 text-gray-900">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-6 mt-9 shadow-sm">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Shared Certificate</h1>
          <div className="flex flex-wrap gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <span>Shared by {certificateData.sharedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Shared on {certificateData.dateShared}</span>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 text-blue-500 mb-4"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <p className="text-lg font-medium mb-2 text-gray-800">{certificateData.fileName}</p>
          <p className="text-gray-500 mb-4">PDF Document • 2.4 MB</p>
          
          {/* PDF Preview Placeholder */}
          <div className="w-full h-48 bg-white rounded border border-gray-200 flex items-center justify-center text-gray-400">
            [Certificate Preview Would Appear Here]
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            {certificateData.viewed ? (
              <span className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                Viewed
              </span>
            ) : (
              <span className="flex items-center gap-2 text-yellow-600">
                <span className="text-lg">•</span>
                Not viewed yet
              </span>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 flex-1 sm:flex-none">
              <Download className="h-4 w-4" />
              Download
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white flex-1 sm:flex-none">
              <Share2 className="h-4 w-4" />
              Share Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedCertificateScreen;