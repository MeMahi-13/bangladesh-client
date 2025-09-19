import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {

  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

     signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user)
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
  switch (error.code) {
    case "auth/invalid-email":
      setError("Invalid email format.");
      break;
    case "auth/user-not-found":
      setError("No account found with this email.");
      break;
    case "auth/wrong-password":
      setError("Incorrect password. Please try again.");
      break;
    default:
      setError("Login failed. Please try again.");
  }
      });
  };
 
  return (
    <div className="bg-lightblue flex justify-center items-center min-h-screen px-4">
      <div className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black text-sm font-medium mb-1 ">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border-3 border-blue text-black focus:outline-none focus:ring-2 focus:ring-green-700 "
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-lg border-3 border-blue text-black focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right">
<Link to="/auth/forgetPassword" className="text-sm text-blue hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold rounded-lg transition-all"
          >
            Login
          </button>

          <p className="text-center text-sm font-medium text-gray-500 pt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 hover:underline ">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;