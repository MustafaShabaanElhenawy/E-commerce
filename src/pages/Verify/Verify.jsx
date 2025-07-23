import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    if (error && val.trim() !== "") {
      setError("");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");

    if (code.trim() === "") {
      setError("Code is required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          email,
          resetCode: code,
        }
      );
      navigate("/reset", { state: { email } });
    } catch {
      setError("Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-[32px] font-medium mt-10 mb-3">
        Enter verification code
      </h2>
      <form onSubmit={handleVerifyCode}>
        <div className="code py-3">
          <input
            type="text"
            id="code"
            className="form-control px-2 py-3"
            placeholder="code"
            value={code}
            onChange={handleCodeChange}
          />
          {error && <p className="text-red-600 mt-1">{error}</p>}
        </div>
        <button
          disabled={loading || error !== "" || code.trim() === ""}
          className={`border-1 mt-3 py-2 px-5 text-[20px] rounded-md transition-colors duration-200 ${
            loading || error !== "" || code.trim() === ""
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
