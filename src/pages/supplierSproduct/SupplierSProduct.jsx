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
  const [ name, setName] = useState('');
  const [ quantity, setQuantity] = useState('');
  const [ description, setDescription] = useState('');
  const [ price, setPrice] = useState('');
  const [ shop, setShop] = useState('');
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
  Name: name,
  Description: description,
  Quantity: quantity,
  Price: price,
  Shop: shop
 
}
///product/update/:id
  var shopItemId = localStorage.getItem('shopItemId');
  axios
    .put(`https://windowshoppingserver.herokuapp.com/product/update/${shopItemId}`, data)
    .then(() => {
      navigate("/supplier");
    });
};


  return (
 //login page forms
    <Grid>
        <Paper className="Container cont"> 
          <h1>Edit Product</h1>
            
          <div className="Container">
            <label>Name:</label>
            <input
              label="Name"
              style={fieldStyle}
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <label>Desription:</label>
            <input
            type="text"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            />
            <label>Quantity:</label>
            <input
              type="text"
              value={quantity}
              onChange={(e)=>{setQuantity(e.target.value)}}
            />
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
            />
            

            <button onClick={updateProduct} style={{cursor: "pointer"}}> Update Product</button>
           
            </div>
        </Paper>
    </Grid>
  );
}

export default SupplierSProduct;