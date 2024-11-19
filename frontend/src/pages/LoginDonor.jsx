import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      setLoading(true);
      setError("");
      const userData = { email, password, role };

      const endpoint =
        role === "donor"
          ? `${API_BASE_URL}/api/auth/login-donor`
          : `${API_BASE_URL}/api/auth/login-hospital`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login.");
      }

      const data = await response.json();
      const key = role === "donor" ? "donor" : "hospital";
      localStorage.setItem(key, JSON.stringify(data[key]));
      localStorage.setItem("token", data.token);

      navigate(role === "donor" ? "/hospitalist" : "/hospital-dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    loginUser();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-16">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          {role.charAt(0).toUpperCase() + role.slice(1)} Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            >
              <option value="donor">Donor</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg text-lg hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href={`/register-${role}`}
              className="text-red-500 hover:underline"
            >
              Register as {role}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
