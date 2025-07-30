import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { API_CONFIG } from "../../config";

export default function Payment() {
  const [inCorrectMsg, setInCorrectMsg] = useState("");

  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;

  const validationSchema = yup.object({
    details: yup.string().required("Details is required"),

    phone: yup
      .string()
      .required("phone number is required")
      .matches(phoneRegex, " we accept egyption numbers only"),
    city: yup.string().required("City is required"),
  });

  async function handelPayment(values) {
    try {
      const options = {
        method: "POST",
        url: `${API_CONFIG.baseURL}/orders/checkout-session/67b210df429eb834606c7a30?url=http://localhost:3000`,
        data: {
          details: values.details,
          phone: values.phone,
          city: values.city,
        },
      };
    } catch (error) {
      setInCorrectMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handelPayment,
    validateOnMount: true,
  });

  return (
    <>
      <div className=" container">
        <form onSubmit={formik.handleSubmit}>
          <div className="Details py-3 mt-10 mx-[6%]">
            <label htmlFor="details">Details</label>
            <br />
            <input
              type="text"
              id="details"
              className="form-control "
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.details && formik.errors.details && (
              <p className=" text-red-600">*{formik.errors.details}</p>
            )}
          </div>
          <div className="Phone py-3 mx-[6%]">
            <label htmlFor="phone">Phone</label>
            <br />
            <input
              type="tel"
              id="phone"
              className="form-control "
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className=" text-red-600">*{formik.errors.phone}</p>
            )}
          </div>
          <div className="City py-3 mx-[6%]">
            <label htmlFor="city">City</label>
            <br />
            <input
              type="text"
              id="city"
              className="form-control "
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <p className=" text-red-600">*{formik.errors.city}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid}
            className={` border-1 text-blue-300 rounded-md   mb-48  transition-colors duration-200 mt-10 container ml-[6%] text-nowrap py-1  text-[20px]
           ${
             !formik.isValid
               ? "bg-white"
               : " hover:text-white hover:bg-blue-400"
           }
        `}
          >
            Pay now
          </button>
        </form>
      </div>
    </>
  );
}
