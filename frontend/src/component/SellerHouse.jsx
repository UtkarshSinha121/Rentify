import React, { useEffect, useState } from 'react'
import Header from './Header'
import useUserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const SellerHouse = () => {

    const navigate = useNavigate();
    const [houseData, setHouseData] = useState([]);
    const {currentUser} = useUserContext();

    const fetchSellerData = async () => {
        const res = await fetch('https://rentify-g3b1.onrender.com/addhouse/seller/'+currentUser._id,
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
    const deleteHouse = async  (id) =>{
        console.log(id);
        //pass alert before deleting
        const c =  window.confirm('Are you sure you want to delete this post? ');
        if(c===true ){
        const res = await  fetch('https://rentify-g3b1.onrender.com/addhouse/delete/'+id, {method:'DELETE'});
        if(res.status === 200){
            // fetchSellerData();
            toast.success('House details deleted successfully')
        } 
      }
      else 
      {
        toast.error('House details not deleted')
      }
      }
    useEffect(() => {
        fetchSellerData();
    }, [deleteHouse]);

    
    

    const displayHouseData = () => {
        if(houseData.length === 0){
            return <div>No House Found</div>
        }
        return houseData.map((house)=>(
           
            <div className='col-md-3 '>
                <div className="card ">   
                    <div className="card-header">
                    <img src={"https://rentify-g3b1.onrender.com/"+house.image} width={230} height={210} style={{overflow:'hidden'}} />
                    </div>
                    <div className="card-body">
                    <p>{house.type} Flat | {house.furnishing}</p>
                     <h4>₹{house.price}</h4>
                     <p>{house.location}</p>
                     <p>{house.contact}</p>
                     <p>{house.ownername}</p>
                        <i style={{color:'red'}} onClick={()=>{deleteHouse(house._id)}} class="fa-solid fa-trash-can mx-3" title='Delete'></i>
                     <i style={{color:'blue'}} onClick={()=>{navigate('/edit/'+house._id)}} class="fa-regular fa-pen-to-square" title='Edit'></i>
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