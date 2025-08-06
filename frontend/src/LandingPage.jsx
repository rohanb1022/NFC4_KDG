import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; // Adjust path if needed

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuthStore();

  const handleStartIssuing = () => {
    if (isAuthenticated && role === "institute") {
      navigate("/institute/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const handleViewCertificates = () => {
    if (isAuthenticated && role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc] text-gray-800">
      {/* HEADER */}
      <header className="p-6 max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="text-blue-600" />
          CertChain
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Login
          </Button>
          <Button onClick={() => navigate("/auth")}>Get Started</Button>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Secure. Shareable. <span className="text-blue-600">Solana Certificates</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          CertChain empowers institutions to issue blockchain-based certificates
          on Solana, and allows students to securely store and share them.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={handleStartIssuing}>
            Start Issuing Certificates
          </Button>
          <Button variant="outline" size="lg" onClick={handleViewCertificates}>
            View My Certificates
          </Button>
        </div>
      </main>

      {/* FEATURES */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <GraduationCap className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-gray-600">
              Access your credentials anytime, share them securely with anyone.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Building2 className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Institutions</h3>
            <p className="text-gray-600">
              Manage and issue tamper-proof certificates with ease.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">On Solana</h3>
            <p className="text-gray-600">
              Fast, low-cost, and verifiable certificate storage on-chain.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-4 text-center text-sm text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} CertChain. Built on Solana.
      </footer>
    </div>
  );
}
