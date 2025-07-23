import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { API_CONFIG } from "../../config";
import { AuthContext } from "../../Context/Auth.context";

export default function Login() {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inCorrectMsg, setInCorrectMsg] = useState("");
  const [isExistError, setIsExistError] = useState(null);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = yup.object({
    email: yup.string().required("email is required").email("Email is invalid"),

    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function handelLogin(values) {
    try {
      const options = {
        method: "POST",
        url: `${API_CONFIG.baseURL}/auth/signin`,
        data: {
          email: values.email,
          password: values.password,
        },
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success(" Welcome back ");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate(from);
        }, 3000);
      }
    } catch (error) {
      setIsExistError(error.response.data.message);
      setInCorrectMsg("Incorrect email or password");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
    validateOnMount: true,
  });

  return (
    <div className="container">
      <h2 className="text-[32px] font-medium mt-16 mb-5">Login Now</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="Email py-3">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              setInCorrectMsg("");
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600">*{formik.errors.email}</p>
          )}
        </div>

        <div className="Password py-3">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setInCorrectMsg("");
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600">*{formik.errors.password}</p>
          )}
          {inCorrectMsg && <p className="text-red-600">*{inCorrectMsg}</p>}
        </div>

        <div>
          <Link to="/Forget">
            <span className=" text-gray-700 hover:text-primary-600 font-medium text-[18px] transition-colors duration-200">
              Forget your password?
            </span>
          </Link>

          <button
            type="submit"
            disabled={!formik.isValid}
            className={` ml-[75%]  rounded-md py-2 px-6 mb-48 btn text-[20px] text-gray-600 border border-gray-300 transition-colors duration-200 ${
              !formik.isValid
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:text-white hover:bg-primary-500"
            }`}
          >
            Login now
          </button>
        </div>
      </form>
    </div>
  );
}
