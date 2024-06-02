import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="">
      <h1 className="text-center">404 Not Found</h1>
      <div className="d-flex justify-content-center">
        <NavLink to="/">
          <button className="btn button-clr">Go Back To Home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
