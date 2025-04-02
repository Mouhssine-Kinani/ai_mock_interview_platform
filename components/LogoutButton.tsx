"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { success } = await logout();
      if (success) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
