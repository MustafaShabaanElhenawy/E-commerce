import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
import { API_CONFIG } from "../../config";
export default function Register() {
  const navigate = useNavigate();
  const [isExistError, setIsExistError] = useState(null);

  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required").email("Email is invalid"),
    phone: yup
      .string()
      .required("phone number is required")
      .matches(phoneRegex, " we accept egyption numbers only"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "password should be the same"),
  });

  async function handelRegister(values) {
    try {
      const options = {
        method: "POST",
        url: `${API_CONFIG.baseURL}/auth/signup`,
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
        },
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success(" your account has been created");
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      }
    } catch (error) {
      setIsExistError(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelRegister,
    validateOnMount: true,
  });

  return (
    <>
      <div className=" container">
        <h2 className="text-[32px] font-medium mt-16 mb-5">register now</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="Name py-3 ">
            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              id="name"
              className="form-control "
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className=" text-red-600">*{formik.errors.name}</p>
            )}
          </div>
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
                setIsExistError(null);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className=" text-red-600">*{formik.errors.email}</p>
            )}
            {isExistError && <p className="text-red-600">*{isExistError}</p>}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className=" text-red-600">*{formik.errors.password}</p>
            )}
          </div>
          <div className="rePassword py-3">
            <label htmlFor="rePassword">rePassword:</label>
            <br />
            <input
              type="password"
              id="rePassword"
              className="form-control"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className=" text-red-600">*{formik.errors.rePassword}</p>
            )}
          </div>
          <div className="Phone py-3">
            <label htmlFor="phone">Phone:</label>
            <br />
            <input
              type="tel"
              id="phone"
              className="form-control"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className=" text-red-600">*{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid}
            className={`mt-5 rounded-md py-2 px-6 mb-48  ml-[87%]  text-[20px]  text-gray-600 border border-gray-300 transition-colors duration-200
    ${!formik.isValid ? "bg-gray-200" : "hover:text-white hover:bg-primary-500"}
  `}
          >
            Register now
          </button>
        </form>
      </div>
    </>
  );
}
