// components/LogoutButton.jsx
import { LogOut } from "lucide-react";

const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default LogoutButton;
