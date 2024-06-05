import React, { useEffect, useState } from "react";
import Header from "./Header";
import useUserContext from "../UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ShowHouse = () => {
  const navigate = useNavigate();
  const [HouseList, setHouseList] = useState([]);
  const [search, setSearch] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [houseTypeFilter, setHouseTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [filteredHouseData, setFilteredHouseData] = useState([]);
  const [houseId, setHouseId] = useState(null);

  const { loggedIn, contact, setContact, currentUser } = useUserContext();

  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredHouseData.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };
  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

 
  

  const currentHouseData = filteredHouseData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const fetchHouseData = async () => {
    const res = await fetch("https://rentify-g3b1.onrender.com/addhouse/getall");
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

  useEffect(() => {
    if (loggedIn) {
      setFilteredHouseData(HouseList.filter(house => house.email !== currentUser.email));
    } else {
      setFilteredHouseData(HouseList);
    }
  }, [loggedIn, HouseList]);

  
  const displayHouseData = () => {

    if (currentHouseData.length === 0) {
      return <div>No House Found</div>;
    }
    return currentHouseData.map((house) => (
      <div className="col-md-3 mb-3">
        <div className="card ">
          <div className="card-header">
            <img
              src={"https://rentify-g3b1.onrender.com/" + house.image}
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
            <i
              style={{ color: "blue" }}
              onClick={() => {
                navigate("/view/" + house._id);
              }}
              class="fa-regular fa-pen-to-square"
              title="Edit"
            ></i>
            {/* <button
              className="btn btn-primary rounded-4 w-100 mb-2 "
              onClick={() => displayContact(house._id)}
            >
              View Details
            </button> */}
            {/* {contact && houseId === house._id ? <div>
              <h6 className="fw-bold">Contact Owner</h6>
              <p className="text-secondary">Owner Name : {house.ownername}</p>
              <p className="text-secondary">Contact Number : {house.contact}</p>
            </div> : null} */}
          </div>
        </div>
      </div>
    ));
  };

  const searchByLocation = (e) => {
    setLocationFilter(e.target.value);
  };
  const searchByHouseType = (e) => {
    setHouseTypeFilter(e.target.value);
  };
  const searchByPrice = (e) => {
    setPriceFilter(e.target.value);
  };

  const filterHouse = () => {
    setHouseList(
      search.filter((house) => {
        return (
          (house.location
            .toLowerCase()
            .includes(locationFilter.toLowerCase())) &&
            ((house.type === houseTypeFilter) ||
          (houseTypeFilter === "")) && ((priceFilter === "") ||
          (priceFilter === "<5000" && house.price < 5000) ||
          (priceFilter === "<5000-10000" &&
            house.price >= 5000 &&
            house.price <= 10000) ||
          (priceFilter === "10000-15000" &&
            house.price >= 10000 &&
            house.price <= 15000) ||
          (priceFilter === "15000-20000" &&
            house.price >= 15000 &&
            house.price <= 20000) ||
          (priceFilter === "20000-25000" &&
            house.price >= 20000 &&
            house.price <= 25000) ||
          (priceFilter === ">25000" && house.price > 25000))
          
        );
      })
    );
  };
  useEffect(() => {
    filterHouse();
  }, [locationFilter, houseTypeFilter, priceFilter]);

  return (
    <div className="show-bg">
      <header className="bg-target-tertiary">
        <div className="container py-5 ">
          <p className="font  display-5 text-center fw-bold mt-2">
            Browse Houses
          </p>
          <div className=" d-flex justify-content-center ">
            <div className="input-group w-75">
            <input
              type="text"
              className="form-control  m-auto rounded-4"
              placeholder="Search Houses by Location..."
              onChange={searchByLocation}
              style={{ width: "250px" }}
            />
            <select className="form-select  rounded-4 ms-2" onChange={searchByHouseType}>
              <option selected value="">
                Select House Type
              </option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="4BHK">4BHK</option>
              <option value="5BHK">5BHK</option>
            </select>
            <select className="form-select rounded-4 ms-2" onChange={searchByPrice}>
              <option selected value="">
                Select Price Range
              </option>
              <option value="<5000">Up to 5000</option>
              <option value="<5000-10000">5000-10000</option>
              <option value="10000-15000">10000-15000</option>
              <option value="15000-20000">15000-20000</option>
              <option value="20000-25000">20000-25000</option>
              <option value=">25000">Above 25000</option>
            </select>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row pb-3 ">{displayHouseData()}</div>
        <div className="d-flex justify-content-center pb-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index + 1 === page ? "active" : ""}`}
              onClick={() => setPage(index + 1)}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button
            className="btn btn-primary mx-2"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowHouse;
