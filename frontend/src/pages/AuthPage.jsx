/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import StudentSignup from "../components/StudentSignup";
import StudentLogin from "../components/StudentLogin";
import InstitutionSignup from "../components/InstitutionSignup";
import InstitutionLogin from "../components/InstitutionLogin";

const AuthPage = () => {
  const [userType, setUserType] = useState("institution");
  const [authType, setAuthType] = useState("signup");

  const renderForm = () => {
    if (userType === "institution" && authType === "signup")
      return <InstitutionSignup />;
    if (userType === "institution" && authType === "login")
      return <InstitutionLogin />;
    if (userType === "student" && authType === "signup")
      return <StudentSignup />;
    if (userType === "student" && authType === "login")
      return <StudentLogin />;
    return null;
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black text-white p-6 space-y-5 border border-white">
          <CardHeader>
            <CardTitle className="text-xl text-white text-center">
              {authType === "signup" ? "Create Account" : "Welcome Back"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* User Type Selector */}
            <Select
              onValueChange={(value) => setUserType(value)}
              defaultValue={userType}
            >
              <SelectTrigger className="w-full bg-black text-white border-white">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-white">
                <SelectItem value="institution">Institution</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>

            {/* Auth Type Toggle */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className={`flex-1 border-white text-white ${
                  authType === "signup" ? "bg-white text-black" : "bg-black"
                }`}
                onClick={() => setAuthType("signup")}
              >
                Signup
              </Button>
              <Button
                variant="outline"
                className={`flex-1 border-white text-white ${
                  authType === "login" ? "bg-white text-black" : "bg-black"
                }`}
                onClick={() => setAuthType("login")}
              >
                Login
              </Button>
            </div>

            {/* Render Form */}
            <div>{renderForm()}</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
