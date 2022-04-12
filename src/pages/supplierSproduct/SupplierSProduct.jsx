import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import {  Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {  TextField, IconButton } from '@material-ui/core';
import {  DeleteOutline, EditOutlined, SearchOutlined  } from "@material-ui/icons";
import './supplierSProduct.css';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function SupplierSProduct() {
  const [ Name, setName] = useState('');
  const [ Quantity, setQuantity] = useState('');
  const [ Description, setDescription] = useState('');
  const [ Price, setPrice] = useState('');
  const [ Shop, setShop] = useState('');
  
  let navigate = useNavigate();
  

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  
 // getting list of user products based on user id 
 useEffect(() => { 
    var ProductId = localStorage.getItem('id');
      axios.get(`http://localhost:3002/product/byId/${ProductId}`).then((response) => {
          console.log(response.data);
           // console.log(response.data.Name);
          setName(response.data.Name);
           // console.log(response.data.AnimalType);
          setDescription(response.data.Description);
           // console.log(response.data.Cateogry);
          setQuantity(response.data.Quantity);
          //console.log(response.data.Price)
          setPrice(response.data.Price);
          setShop(response.data.Shop);
          
      });
  }, []);

  //updating the khola info
const updateProduct = () => {

  // data to be updated crucial
const data = {
  Name: Name,
  Description: Description,
  Quantity: Quantity,
  Price: Price,
  Shop: Shop
 
}
///product/update/:id
  var shopItemId = localStorage.getItem('shopItemId');
  axios
    .put(`http://localhost:3002/product/update/${shopItemId}`, data)
    .then(() => {
      navigate("/supplier");
    });
};

//deleting the product 
const deleteProduct = () => {
  var shopItemId = localStorage.getItem('shopItemId');
  axios
    .delete(`http://localhost:3001/product/delete/${shopItemId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      navigate("/supplier");
    });
  };
  
  return (
 //login page forms
 <div className="Container"> 
 <h1>Edit/Delete Product</h1>
 
    <div className="Container">
<label>Name:</label>
<input
 type="text"
 value={Name}
 onChange={(e)=>{setName(e.target.value)}}
/>
<label>Desription:</label>
<input
 type="text"
 value={Description}
 onChange={(e)=>{setDescription(e.target.value)}}
/>
<label>Category:</label>
<input
 type="text"
 value={Quantity}
 onChange={(e)=>{setQuantity(e.target.value)}}
/>
<label>Price:</label>
<input
 type="number"
 value={Price}
 onChange={(e)=>{setPrice(e.target.value)}}
/>
<input
 type="text"
 value={Shop}
 onChange={(e)=>{setShop(e.target.value)}}
/>


<button onClick={updateProduct} style={{cursor: "pointer"}}> Update Product</button>
<button onClick={deleteProduct} style={{cursor: "pointer"}}> Delete Product</button>
   {/* ********************************** * */}
   
{/* *************************************       */}
</div>
</div>
  );
}

export default SupplierSProduct;