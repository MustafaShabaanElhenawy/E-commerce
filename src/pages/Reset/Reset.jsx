import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export default function Reset() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (error) {
      if (passwordRegex.test(val)) {
        setError("");
      }
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
      );
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword: password,
        }
      );

      const loginResponse = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", loginResponse.data.token);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password or login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-[32px] font-medium mt-10 mb-3">
        Reset your account password
      </h2>
      <form onSubmit={handleReset}>
        <div className="email py-3">
          <input
            type="email"
            id="email"
            className="form-control px-2 py-3"
            placeholder="email"
            value={email}
            disabled
          />
        </div>
        <div className="new-password py-3">
          <input
            type="password"
            id="new-password"
            className="form-control px-2 py-3"
            placeholder="new password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <p className="text-red-600 mt-1">{error}</p>}
        </div>
        <button
          disabled={loading || error !== "" || password === ""}
          className={`border-1 mt-3 py-2 px-5 text-[20px] rounded-md transition-colors duration-200 ${
            loading || error !== "" || password === ""
              ? "text-gray-400 border-gray-400 cursor-not-allowed"
              : "text-primary-500 border-primary-500 hover:text-white hover:bg-primary-700"
          }`}
          type="submit"
        >
          reset password
        </button>
      </form>
    </div>
  );
}
