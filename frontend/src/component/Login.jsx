import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Header from "./Header";
import { NavLink, useNavigate } from "react-router-dom";
import useUserContext from "../UserContext";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short").required("Required"),
});

const Login = () => {

  const navigate = useNavigate();

  const {loggedIn, setloggedIn, setcurrentUser } = useUserContext();

  // initializing formik
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
       if(loggedIn){
        Swal.fire({
          icon: "warning",
          title: "Already Logged In",
          text: "You are already logged in",
        });
        return;
      }
      console.log(values);

      const res = await fetch("http://localhost:5000/user/authenticate", {
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
          title: "Login Success!!",
        });

        const data = await res.json();
        sessionStorage.setItem("user", JSON.stringify(data));
        // setcurrentUser(data);
        setloggedIn(true);
        setcurrentUser(data);

        navigate("/show");
      } else if (res.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Login Failed",
          text: "Invalid email or password",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Some Error Occured",
        });
      }
    },

    validationSchema: loginSchema,
  });

  return (
    <div className="loginbg">
      <div className="container py-4 mt-5 vh-100">
        <div className="d-flex">
          <div className="col-md-4">
            <div className="card rounded-4">
              <div className=" card-body">
                <h2 className="text-center fw-bold my-3">LOGIN</h2>
                <p className="text-center">Please enter your login and password!  </p>
                <form onSubmit={loginForm.handleSubmit}>
                  <div className="form-outline ">
                    <p>{loginForm.errors.email}</p>
                    {/* <label htmlFor="">Email</label> */}
                    <input
                      className="form-control  mb-4"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={loginForm.handleChange}
                      value={loginForm.values.email}
                    />
                  </div>
                  <div>
                    <p>{loginForm.errors.password}</p>
                    {/* <label htmlFor="">Password</label> */}
                    <input
                      className="form-control mb-4"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={loginForm.handleChange}
                      value={loginForm.values.password}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn button-clr  w-100 rounded-3"
                  >
                    SIGN IN
                  </button>
                </form>
                <p className="text-center fw-bold mt-3">Don't have an account?</p>
                <NavLink className="nav-link" to="/signup" >
                   <button className="btn button-clr w-100 rounded-3">
                        SIGN UP
                   </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
