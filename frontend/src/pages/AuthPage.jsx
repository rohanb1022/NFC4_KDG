/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

import StudentSignup from "../components/StudentSignup";
import StudentLogin from "../components/StudentLogin";
import InstitutionSignup from "../components/InstitutionSignup";
import InstitutionLogin from "../components/InstitutionLogin";

const AuthPage = () => {
  const [userType, setUserType] = useState("institution");
  const [activeTab, setActiveTab] = useState("signin");

  const renderForm = () => {
    if (userType === "institution" && activeTab === "signup")
      return <InstitutionSignup />;
    if (userType === "institution" && activeTab === "signin")
      return <InstitutionLogin />;
    if (userType === "student" && activeTab === "signup")
      return <StudentSignup />;
    if (userType === "student" && activeTab === "signin")
      return <StudentLogin />;
    return null;
  };

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8521/8521795.png" 
            alt="" 
            className="max-h-10 min-w-10"
          />
          <span className="font-extrabold text-2xl ml-4">CertChain</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Sign in to your account</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* User Type Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Type</label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="institution">Institution</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  
                  {/* Render Form */}
                  <div>{renderForm()}</div>
                </CardContent>
              </Card>
            </TabsContent>

            
            <TabsContent value="signup">
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Create a new account</CardTitle>
                  <CardDescription>
                    Enter your details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* User Type Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Type</label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="institution">Institution</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  
                  {/* Render Form */}
                  <div>{renderForm()}</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
