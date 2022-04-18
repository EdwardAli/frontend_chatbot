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
import { SearchOutlined } from '@material-ui/icons';
import UserSupplier from '../../image/commentUser.jpg'
import './supplierMarket.css';

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '400px',
  color: theme.palette.text.secondary,
}));


function SupplierMarket() {

  // initialising classes to the methodof UseStyles() method
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  let navigate = useNavigate();

  let count = 1;
 // getting list of user products based on user id /product/All
  useEffect(() => { 
 
    axios.get("https://windowshoppingserver.herokuapp.com/product/All").then((response) => {
        console.log(response.data);
       setProducts(response.data);
        
    });
}, []);


  return (
    <div className="home"> 
                
          <TextField style={{margin: "10px",marginTop: "8vh", backgroundColor: "#fafafa"}}
          onChange={(e) => setSearchTitle(e.target.value)}
               
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Product)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
              <hr/>
            
          
      <table className="">
          <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Shop</th>
                
              </tr>
          </thead>
          <tbody>
              {products.filter((value) => {
                    if (searchTitle === "") {
                      return value;
                     } else if (
                      value.Name?.toLowerCase().includes(searchTitle.toLowerCase())
                    ) {
                      return value;
                    }
                  }).map((value, key) => {
              return (
                <tr onClick={() => {
                  localStorage.setItem("orderId", JSON.stringify(value.ProductId))
                }}>
                  <th>{key+1}</th>
                  <td>{value.Name}</td>
                  <td>MK: {value.Price}</td>
                  <td>{value.Quantity}</td>
                  <td>{value.Description}</td>
                  <td>{value.Shop}</td>
                </tr>
                );
              })}

          </tbody>
         
      </table>
     </div>
     
    
  );
}

export default SupplierMarket;