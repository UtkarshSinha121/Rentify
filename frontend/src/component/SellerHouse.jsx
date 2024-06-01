import React, { useEffect, useState } from 'react'
import Header from './Header'
import useUserContext from '../UserContext';


const SellerHouse = () => {
    const [houseData, setHouseData] = useState([]);
    const {currentUser} = useUserContext();

    const fetchSellerData = async () => {
        const res = await fetch('http://localhost:5000/addhouse/seller/'+currentUser._id,
           {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
           }
        );
        if(res.status === 200){
            const data = await res.json();
            setHouseData(data);
        }
       
    };
    useEffect(() => {
        fetchSellerData();
    }, []);

    const displayHouseData = () => {
        if(houseData.length === 0){
            return <div>No House Found</div>
        }
        return houseData.map((house)=>(
           
            <div className='col-md-3 '>
                <div className="card ">   
                    <div className="card-header">
                    <img src={"http://localhost:5000/"+house.image} width={230} height={210} style={{overflow:'hidden'}} />
                    </div>
                    <div className="card-body">
                    <p>{house.type} Flat | {house.furnishing}</p>
                     <h4>₹{house.price}</h4>
                     <p>{house.location}</p>
                     <p>{house.contact}</p>
                    </div>
                </div>
            </div>
            
        ))
    }

  return (
    <div className='show-bg'>
    <h1 className='text-center fw-bold p-2'>My Houses</h1>
    <div className='container'>
    <div className='row pb-3'> 
        {displayHouseData()}
    </div>
    </div>
    </div>

  )
}

export default SellerHouse