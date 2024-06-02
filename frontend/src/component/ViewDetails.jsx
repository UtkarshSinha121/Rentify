import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewDetails = () => {
    const{id} = useParams();
  const navigate = useNavigate();
    const [Data, setData] = useState([])
    
    

  const fetchHouseData = async () => {
    const res = await fetch('http://localhost:5000/addhouse/get/'+id,
          {
            method: 'GET',
            headers: {
             'Content-Type' : 'application/json'
            }
          }
      );
        if(res.status === 200){
            const data = await res.json();
            console.log(data);
            setData(Array.isArray(data) ? data : [data]);
            setfirst(data);
            console.log(Data);
            
        }
    };
    useEffect(() => {
        fetchHouseData();
    }, []);

  const displayHouseData = () => {
    if (Data.length === 0) {
      return <div>No House Found</div>;
    }
    return Data.map((house) => (
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
            <p className="text-secondary">{house.contact}</p>
          </div>
        </div>
      </div>
    ));
  };
  
  return (
    <div className="show-bg">
      <div className="container">
        <div className="row pb-3 ">{displayHouseData()}</div>
      </div>
    </div>
  );
};

export default ViewDetails;
