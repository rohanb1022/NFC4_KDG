import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const StudentCertificateRow = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(course.fileUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <div className="flex justify-between items-center border p-4 rounded mb-4">
        <div>
          <h3 className="text-lg font-bold">{course.name}</h3>
          <p>{course.description}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.open(course.fileUrl, "_blank")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Certificate
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Share
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-2">Share Certificate</Dialog.Title>

          <QRCode value={course.fileUrl} size={160} />
          <p className="mt-4 break-all text-center">{course.fileUrl}</p>

          <div className="mt-4 flex justify-between gap-4">
            <button
              onClick={handleCopy}
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
            >
              Copy Link
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default StudentCertificateRow;
