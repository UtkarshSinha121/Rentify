import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserContext from "../UserContext";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';
import { toast } from "react-hot-toast";

const ViewDetails = () => {
    const{id} = useParams();
  const navigate = useNavigate();
    const [Data, setData] = useState([])

    const {currentUser} = useUserContext();

    const sendEmail = (ownername, owneremail, firstname, lastname, email, location) => {
      emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATEID, {
        to_name: ownername,
        to_email: owneremail,
        from_name: firstname + " " + lastname,
        from_email: email,
        message: `Hello, I am ${firstname} ${lastname} and I am interested in your house at ${location}. Please contact me on ${email}`
      }, process.env.REACT_APP_EMAILJS_USERID)
      .then(() => {
        console.log('SUCCESS');
        toast.success('Email Sent Successfully');
      }, (error) => {
        console.log('FAILED', error);
        toast.error('Email Failed to Send');
      });
    }
        
    
    

  const fetchHouseData = async () => {
    const res = await fetch('https://rentify-g3b1.onrender.com/addhouse/get/'+id,
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
      <div className="col-md-12 mt-5 ">
        <div className="card vh-75 ">
          <div className="d-flex">
          <div className="card-header rounded-4 ">
            <img
              className="rounded-4"
              src={"https://rentify-g3b1.onrender.com/" + house.image}
              width={430}
              height={410}
              style={{ overflow: "hidden" }}
            />
          </div>
          <div className="card-body">
            <div className="mb-3 mt-3">
            <h5 className="d-inline fw-bold">House Rent : </h5><h5 className="text-secondary d-inline">₹{house.price}/Month</h5>
            </div>
            <div className="mb-3">
            <h5 className="d-inline fw-bold">House Type :</h5><h5 className="d-inline text-secondary"> {house.type} Flat </h5>
            </div>
            <div className="mb-3">
            <h5 className="d-inline fw-bold">House Furnishing :</h5><h5 className="d-inline text-secondary"> {house.furnishing} </h5>
            </div>
            <div className="mb-3">
            <h5 className="d-inline fw-bold">House Address :</h5><h5 className="d-inline text-secondary"> {house.location} </h5>
            </div>
            <div className="mb-3">
            <h5 className="d-inline fw-bold">Owner Name :</h5><h5 className="d-inline text-secondary"> {house.ownername} </h5>
            </div>
            <div className="mb-3 d-flex">
            <h5 className="d-inline fw-bold">Contact Number :</h5><h5 className="d-inline text-secondary"> {house.contact} </h5>
            <a className="mx-3" href={`https://wa.me/+91${house.contact}?text=${encodeURIComponent(`Hello, I am  interested in renting your property located at ${house.location}. `)}`} target="_blank">
            <i class="fa-brands fa-whatsapp fa-beat fa-xl "  style={{color:'#03e26f'}} title="Message on Whatsapp"></i></a>
            </div>
            <div className="mb-4">
            <h5 className="d-inline fw-bold">Owner Email :</h5><h5 className="d-inline text-secondary"> {house.email} </h5>
            </div>
            <p>If you're interested in this house, click "interested" to send an email to the owner.</p>
            <button className="btn btn-primary" onClick={() =>sendEmail(house.ownername, house.email, currentUser.firstname, currentUser.lastname, currentUser.email, house.location)}>Send Email</button> 
          </div>
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
