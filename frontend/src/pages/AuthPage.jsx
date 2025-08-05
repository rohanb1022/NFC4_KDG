import React, { useState } from 'react';
import StudentSignup from '../components/StudentSignup';
import StudentLogin from '../components/StudentLogin';
import InstitutionSignup from '../components/InstitutionSignup';
import InstitutionLogin from '../components/InstitutionLogin';

const AuthPage = () => {
  const [userType, setUserType] = useState('institution');
  const [authType, setAuthType] = useState('signup');

  const renderForm = () => {
    if (userType === 'institution' && authType === 'signup') return <InstitutionSignup />;
    if (userType === 'institution' && authType === 'login') return <InstitutionLogin />;
    if (userType === 'student' && authType === 'signup') return <StudentSignup />;
    if (userType === 'student' && authType === 'login') return <StudentLogin />;
  };

  return (
    <div className="w-full h-screen bg-[#121212] overflow-y-hidden flex items-center justify-center">
      <div className="border-2 border-white rounded-xl w-[90%] max-w-md p-6 bg-[#121212] space-y-5">
        
        {/* Toggle Buttons */}
        <div className="flex gap-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg border border-white text-sm font-medium ${
              userType === 'institution' ? 'bg-white text-black' : 'bg-[#121212] text-white'
            }`}
            onClick={() => setUserType('institution')}
          >
            for institution
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg border border-white text-sm font-medium ${
              userType === 'student' ? 'bg-white text-black' : 'bg-[#121212] text-white'
            }`}
            onClick={() => setUserType('student')}
          >
            for student
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg border border-white text-sm font-medium ${
              authType === 'signup' ? 'bg-white text-black' : 'bg-[#121212] text-white'
            }`}
            onClick={() => setAuthType('signup')}
          >
            signup
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg border border-white text-sm font-medium ${
              authType === 'login' ? 'bg-white text-black' : 'bg-[#121212] text-white'
            }`}
            onClick={() => setAuthType('login')}
          >
            login
          </button>
        </div>

        {/* Form */}
        <div>{renderForm()}</div>
      </div>
    </div>
  );
};

export default AuthPage;
