
// // Updated Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import "./login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!username || !password) {
//       setError("Please enter both username and password.");
//       setLoading(false);
//       return;
//     }

//     // Check for admin credentials
//     if (username === "admin" && password === "admin123") {
//       sessionStorage.setItem("user", JSON.stringify({ username: "admin", role: "admin" }));
//       login({ username: "admin", role: "admin" });
//       navigate("/admin-dashboard", { replace: true });
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3100/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Login failed!");
//       }

//       if (!data.user) {
//         throw new Error("Invalid user data received.");
//       }

//       sessionStorage.setItem("user", JSON.stringify(data.user));
//       login(data.user);

//       alert("Login successful!");
//       navigate(data.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard", { replace: true });
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="container">
//         <form className="form-container" onSubmit={handleSubmit}>
//           {error && <p className="error-message">{error}</p>}
//           <div>
//             <label htmlFor="username">UserName: </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password: </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



//new latest********************
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      // Admin Login Handling
      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("user", JSON.stringify({ username: "admin", role: "admin" }));
        login({ username: "admin", role: "admin" });
        navigate("/admin-dashboard", { replace: true });
        return;
      }

      // Regular User Login
      const response = await fetch("http://localhost:3100/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      // Ensure valid user data
      if (!data.user) {
        throw new Error("Invalid user data received.");
      }

      // Clear old credentials (only for non-admin users)
      sessionStorage.clear();
      localStorage.clear();

      // Store user & role safely
      sessionStorage.setItem("user", JSON.stringify(data.user));
      login(data.user);

      // Show success message
      alert("Login successful!");

      // Redirect to User Dashboard
      setTimeout(() => {
        navigate("/user-dashboard", { replace: true });
      }, 500);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label htmlFor="username">UserName: </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

