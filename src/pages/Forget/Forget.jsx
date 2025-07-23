import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forget() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (error) {
      if (emailRegex.test(val)) {
        setError("");
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email)) {
      setError("email is not valid");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      navigate("/verify", { state: { email } });
    } catch {
      setError("email is not valid or not registered");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-[32px] font-medium mt-10 mb-3">
        please enter your email
      </h2>
      <form onSubmit={handleVerify}>
        <div className="email py-3">
          <input
            type="email"
            id="email"
            className="form-control px-2 py-3"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className="text-red-600 mt-1">{error}</p>}
        </div>
        <button
          disabled={loading || error !== "" || email === ""}
          className={`border-1 mt-3 py-2 px-5 text-[20px] rounded-md transition-colors duration-200 ${
            loading || error !== "" || email === ""
              ? "text-gray-400 border-gray-400 cursor-not-allowed"
              : "text-primary-500 border-primary-500 hover:text-white hover:bg-primary-700"
          }`}
          type="submit"
        >
          verify
        </button>
      </form>
    </div>
  );
}
