import React, { useEffect, useState } from "react";
import Header from "./Header";
import useUserContext from "../UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ShowHouse = () => {
  const navigate = useNavigate();
  const [HouseList, setHouseList] = useState([]);
  const [search, setSearch] = useState([]);

  const [houseId, setHouseId] = useState(null);

  const { loggedIn, contact, setContact } = useUserContext();

  const fetchHouseData = async () => {
    const res = await fetch("http://localhost:5000/addhouse/getall");
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setHouseList(data);
      setSearch(data);
    }
  };
  useEffect(() => {
    fetchHouseData();
  }, []);

  const displayContact = (x) => {
    if (loggedIn) {
      setContact(true);
      setHouseId(x);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!!",
        text: "You need to login to view contact details",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const displayHouseData = () => {
    if (HouseList.length === 0) {
      return <div>No House Found</div>;
    }
    return HouseList.map((house) => (
      <div className="col-md-3 mb-3">
        <div className="card ">
          <div className="card-header">
            <img
              src={"http://localhost:5000/" + house.image}
              width={230}
              height={210}
              style={{ overflow: "hidden" }}
            />
          </div>
          <div className="card-body">
            <p className="text-secondary">
              {house.type} Flat | {house.furnishing}
            </p>
            <h5>₹{house.price}/Month</h5>
            <p className="text-secondary">{house.location}</p>
            <button
              className="btn btn-primary rounded-4 w-100 mb-2 "
              onClick={() => displayContact(house._id)}
            >
              View Details
            </button>
            {contact && houseId === house._id ? <div>
              <h6 className="fw-bold">Contact Owner</h6>
              <p className="text-secondary">Owner Name : {house.ownername}</p>
              <p className="text-secondary">Contact Number : {house.contact}</p>
            </div> : null}
          </div>
        </div>
      </div>
    ));
  };
  const filterHouse = (e) => {
    const value = e.target.value;
    setHouseList(
      search.filter((house) => {
        return house.location.toLowerCase().includes(value.toLowerCase());
      })
    );
  };
  return (
    <div className="show-bg">
      <header className="bg-target-tertiary">
        <div className="container py-5">
          <p className="font  display-5 text-center fw-bold mt-2">
            Browse Houses
          </p>
          <input
            type="text"
            className="form-control w-50 m-auto"
            placeholder="Search Houses by Location..."
            onChange={filterHouse}
          />
        </div>
      </header>
      <div className="container">
        <div className="row pb-3 ">{displayHouseData()}</div>
      </div>
    </div>
  );
};

export default ShowHouse;
