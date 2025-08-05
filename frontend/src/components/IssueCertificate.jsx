import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStudentStore } from "@/store/useStudentStore";
import axios from "axios";
import { toast } from "react-toastify";

const IssueCertificateModal = ({ isOpen, onClose, selectedStudent }) => {
  const { fetchCertificates } = useStudentStore();

  const [formData, setFormData] = useState({
    courseName: "",
    degreeName: "",
    startDate: "",
    endDate: "",
    issueDate: "",
    expiryDate: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      toast.error("Please upload the certificate file");
      return;
    }

    const certificateData = new FormData();
    certificateData.append("name", formData.courseName);
    certificateData.append("degree", formData.degreeName);
    certificateData.append("startDate", formData.startDate);
    certificateData.append("endDate", formData.endDate);
    certificateData.append("issueDate", formData.issueDate);
    certificateData.append("expiryDate", formData.expiryDate);
    certificateData.append("file", formData.file);
    certificateData.append("studentWalletId", selectedStudent.walletId);
    certificateData.append("studentName", selectedStudent.name);

    try {
      const res = await axios.post(
        "/api/institute/issue-certificate",
        certificateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Certificate issued successfully!");
        fetchCertificates();
        onClose();
        setFormData({
          courseName: "",
          degreeName: "",
          startDate: "",
          endDate: "",
          issueDate: "",
          expiryDate: "",
          file: null,
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to issue certificate");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Issue Certificate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Course Name</Label>
            <Input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Degree Name</Label>
            <Input
              type="text"
              name="degreeName"
              value={formData.degreeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Issue Date</Label>
              <Input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Expiry Date</Label>
              <Input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label>Upload Certificate (PDF)</Label>
            <Input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Issue Certificate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IssueCertificateModal;
