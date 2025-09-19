// import { Navigate } from "react-router-dom";

// export default function AdminRoute({ children }) {
//   // Get item safely
//   const storedUser = localStorage.getItem("adminUser");

//   // Only parse if it exists
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // Redirect if not admin
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
