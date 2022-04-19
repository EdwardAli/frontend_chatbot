import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import {  Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Paper, TextField, IconButton } from '@material-ui/core';
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
  const fieldStyle={fontSize:30, margin:'4px 0', padding: 5}
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
      axios.get(`https://windowshoppingserver.herokuapp.com/product/byId/${ProductId}`).then((response) => {
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

  //updating the prodcts info
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
    .put(`https://windowshoppingserver.herokuapp.com/product/update/${shopItemId}`, data)
    .then(() => {
      navigate("/supplier");
    });
};

const deleteProduct =()=>{
  
    var shopItemId = localStorage.getItem('shopItemId');
     axios
       .delete(`https://windowshoppingserver.herokuapp.com/product/delete/${shopItemId}`, {
         headers: { accessToken: localStorage.getItem("accessToken") },
       })
       .then(() => {
         navigate("/supplier");
       });
   
}


  
  return (
 //login page forms
    <Grid>
        <Paper className="Container cont"> 
          <h1>Edit/Delete Product</h1>
            
          <div className="Container">
            <label>Name:</label>
            <input
              label="Name"
              style={fieldStyle}
              value={Name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <label>Desription:</label>
            <input
            type="text"
            value={Description}
            onChange={(e)=>{setDescription(e.target.value)}}
            />
            <label>Quantity:</label>
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
            type="hidden"
            value={Shop}
            onChange={(e)=>{setShop(e.target.value)}}
            />

            <button onClick={updateProduct} style={{cursor: "pointer"}}> Update Product</button>
            <button onClick={deleteProduct} style={{cursor: "pointer"}}> Delete Product</button>
            
              {/* ********************************** * */}
              
            {/* *************************************       */}
            </div>
        </Paper>
    </Grid>
  );
}

export default SupplierSProduct;