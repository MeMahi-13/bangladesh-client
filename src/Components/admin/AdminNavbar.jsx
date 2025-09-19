// AdminNavbar.jsx
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("admin");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (err) {
      console.error("Failed to parse adminUser", err);
      setUser(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("adminUser");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-[#1B3C53] w-64 fixed top-0 left-0 h-screen text-white px-6 flex justify-between shadow-md">
      <div className="flex flex-col items-start mx-auto space-y-6">
        <Link to="/admin-dashboard" className="text-xl py-7 font-bold">
          Admin Dashboard
        </Link>
        <NavLink
          to="/admin-dashboard" end
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Admin Home
        </NavLink>
        <NavLink
          to="/admin-dashboard/crimes"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Crimes
        </NavLink>
        <NavLink
          to="/admin-dashboard/sos"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          SOS Alerts
        </NavLink>
        <NavLink
          to="/admin-dashboard/lostFound"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Lost & Found
        </NavLink>
<div className="mt-auto mb-10">
 <Link to='/'>
  <button className="text-lg font-bold hover:bg-blue-600 cursor-pointer px-4 py-2 rounded-lg">← Back To Home</button></Link>
</div>
      </div>


      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="font-medium">{user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
