import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homebg">
      <div className="">
        <div className="col-md-5 ">
          <h1 className="head mt-5">Welcome to Rentify</h1>

          <h5 className="head3">Discover the Best Home Near You in Seconds!</h5>
          <p className="head4">
            Your next home is closer than you think. Start your rental journey
            with Rentify today.
          </p>
          <Link to="/show">
            <button className="btn button-clr button ">Browse House Now!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
