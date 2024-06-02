import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Header from "./Header";
import useUserContext from "../UserContext";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  contactnumber: Yup.string()
    .min(10, "Too Short")
    .max(10, "Too Long")
    .required("Required"),
  usertype: Yup.string().required("Required"),
  password: Yup.string().min(8, "Too Short").required("Required"),
});
const Signup = () => {

  const {loggedIn}= useUserContext();
  const navigate = useNavigate();

  const [selImage, setselImage] = useState("");

  const signupForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      contactnumber: "",
      usertype: "",
      password: "",
    },

    onSubmit: async (values) => {
      if (loggedIn) {
        Swal.fire({
          icon: "warning",
          title: "Already Logged In",
          text: "You are already logged in",
        });
        return;
      }
      // values.avatar = selImage;
      console.log(values);

      //sending request to backend
      const res = await fetch("http://localhost:5000/user/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Singnup Sucess!!",
          text: "Now Login to Continue",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Some Error Occured",
        });
      }
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="signupbg">
      <div className="container  py-2 vh-75 mb-4">
        <div className="d-flex ">
          <div className="col-md-4">
            <div className="card px-4 mt-5 rounded-5">
              <div className="card-body">
                <h1 className="text-center fw-bold my-2">SIGN UP</h1>
                <form onSubmit={signupForm.handleSubmit}>
                  <div class="d-flex align-items-center mb-0">
                    <i class="fas fa-user mt-3 fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <p className="error-label">
                        {signupForm.touched.firstname
                          ? signupForm.errors.firstname
                          : ""}
                      </p>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        name="firstname"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.firstname}
                      />
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-0">
                    <i class="fas fa-user mt-3 fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <p className="error-label">
                        {signupForm.touched.lastname
                          ? signupForm.errors.lastname
                          : ""}
                      </p>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        name="lastname"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.lastname}
                      />
                    </div>
                  </div>
                  <div class="d-flex flex-row  align-items-center mb-0">
                    <i class="fas fa-envelope mt-3 fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <p className="error-label">
                        {signupForm.touched.email
                          ? signupForm.errors.email
                          : ""}
                      </p>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.email}
                      />
                    </div>
                  </div>
                  <div class="d-flex flex-row  align-items-center mb-0">
                    <i class="fa-solid mt-3 fa-phone fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <p className="error-label">
                        {signupForm.touched.contactnumber
                          ? signupForm.errors.contactnumber
                          : ""}
                      </p>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Contact Number"
                        name="contactnumber"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.contactnumber}
                      />
                    </div>
                  </div>
                  <div class="d-flex flex-row  align-items-center mb-0">
                    <i class="fa-solid fa-square-check fa-lg mt-3 me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <p className="error-label">
                        {signupForm.touched.usertype
                          ? signupForm.errors.usertype
                          : ""}
                      </p>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="usertype"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.usertype}
                      >
                        <option selected>Select User Type</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                      </select>
                    </div>
                  </div>
                  <div class="d-flex flex-row  align-items-center mb-0">
                    <i class="fas fa-lock fa-lg me-3 mt-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <p className="error-label">
                        {signupForm.touched.password
                          ? signupForm.errors.password
                          : ""}
                      </p>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={signupForm.handleChange}
                        value={signupForm.values.password}
                      />
                    </div>
                  </div>
                  <div class="d-flex flex-row justify-content-center mt-3">
                    <button
                      type="submit"
                      class="btn button-clr rounded-3 w-100 mb-3 "
                    >
                      SIGN UP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div class=" d-flex align-items-center ">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                      className='h-100 w-100' alt="Sample image"/>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
