import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import useUserContext from '../UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddhouseSchema = Yup.object().shape({
    location: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    furnishing: Yup.string().required('Required'),
    ownername: Yup.string().required('Required'),
    contact: Yup.string().required('Required').min(10, 'Too Short').max(10, 'Too Long')
    
  });

const EditHouse = () => {

    const{id} = useParams();
    const navigate = useNavigate();

    const {currentUser} = useUserContext();
 
     const [selImage, setselImage] = useState([]);
     const [Data, setData] = useState([]);

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
                setData(data);
                console.log(data);
            }
        };
        useEffect(() => {
            fetchHouseData();
        }, []);
 
     const addhouseForm = useFormik({
        enableReinitialize: true,
         initialValues: {
           image : Data.image,
           location :Data.location,
           price :Data.price,
           type : Data.type,
           furnishing : Data.furnishing,
           contact : Data.contact,
           ownername : Data.ownername,
           userid :currentUser._id
       
         },
     
         onSubmit: async (values) => {
        
            console.log(values);
             //sending request to backend
           const res = await fetch("http:/localhost:5000/addhouse/update"+id,
           {method:'PUT',
            body:JSON.stringify(values),
            headers:{
             'Content-Type': 'application/json'
            } ,
     
           
         });
           
          console.log(res.status);
          if(res.status === 200){
          toast.success('Post Updated Successfully😊')
          
         navigate('/myprofile');
         }else{
          toast.error('Something went wrong😢')
  
           }

     } ,
         validationSchema: AddhouseSchema
       });
       const uploadFile = async (e) => {
         let file = e.target.files[0];
         setselImage(file.name);
         const fd = new FormData();
         fd.append('myfile', file);
     
         const res = await fetch('http://localhost:5000/util/uploadfile', {
           method: 'POST',
           body: fd
         });
     
         console.log(res.status);
        };
  return (
    <div className='show-bg'>
    <div className="d-flex justify-content-center align-items-center vh-50 bgimg2 ">
      <div className="card w-50 my-3 py-2 add-clr shadow-lg rounded-4">
        <div className="card-body  ">
          <h2 className="text-center loghead my-3 fw-bold">Add House</h2>
          <form onSubmit={addhouseForm.handleSubmit}>
           <div className='d-flex'>
            <div className='w-100 mx-5 '>
            <p className='error-label '>{addhouseForm.touched.location ? addhouseForm.errors.location : ''}</p>
            <input placeholder='House Location' className="form-control   rounded-3" type="text" name="location" onChange={addhouseForm.handleChange} value={addhouseForm.values.location} />           
            <p className='error-label'>{addhouseForm.touched.price ? addhouseForm.errors.price : ''}</p>
            <input placeholder='House Price' className="form-control   rounded-3" type="text" name="price"  onChange={addhouseForm.handleChange} value={addhouseForm.values.price} />
            <p className='error-label'>{addhouseForm.touched.ownername ? addhouseForm.errors.ownername : ''}</p>
            <input placeholder='Owner Name ' className="form-control   rounded-3" type="text" name="ownername"  onChange={addhouseForm.handleChange} value={addhouseForm.values.ownername} />
            <p className='error-label'>{addhouseForm.touched.contact ? addhouseForm.errors.contact : ''}</p>
            <input placeholder='Contact Number' className="form-control   rounded-3" type="number" name="contact"  onChange={addhouseForm.handleChange} value={addhouseForm.values.contact} />
            <p className='error-label'>{addhouseForm.touched.type ? addhouseForm.errors.type : ''}</p>
            <select class="form-control  rounded-3"  aria-label="Default select example" name='type' onChange={addhouseForm.handleChange} value={addhouseForm.values.type}  >
                        <option selected>Select House Type</option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                        <option value="4BHK">4BHK</option>
                        <option value="5BHK">5BHK</option>
           </select>
            <p className='error-label'>{addhouseForm.touched.furnishing ? addhouseForm.errors.furnishing : ''}</p>
            <select class="form-control mb-3  rounded-3"  aria-label="Default select example" name='furnishing' onChange={addhouseForm.handleChange} value={addhouseForm.values.furnishing}  >
                        <option selected>House Furnishing</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully-Furnished">Fully-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>         
           </select>
            <input placeholder='Upload Image'  type="file" className='form-control mb-3' name='image' onChange={uploadFile} />
            </div>
            </div>
            <div className='d-flex justify-content-center'>
            <button type='submit'  className="btn btn-primary w-75  mt-2 rounded-3">
              Add House
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditHouse