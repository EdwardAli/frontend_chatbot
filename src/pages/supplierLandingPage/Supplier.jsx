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
import {  TextField, IconButton, Table } from '@material-ui/core';
import {  DeleteOutline, EditOutlined, SearchOutlined  } from "@material-ui/icons";
import './supplier.css';

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


function Supplier() {

  // initialising classes to the methodof UseStyles() method
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
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
  var id = localStorage.getItem('id');
    axios.get(`https://windowshoppingserver.herokuapp.com/product/byShop/${id}`).then((response) => {
        console.log(response.data);
       setProducts(response.data);
        
    });
}, []);
const NewProduct = () =>{
  navigate("/supplierProducts");
};

  return (
    <div className="home" >
       <div style={{marginLeft: "10vh",marginTop: "8vh"}}>
         <span>
            <TextField style={{marginTop: "8vh", marginLeft: "10vh",backgroundColor: "#fafafa"}}
              onChange={(e) => setSearchTitle(e.target.value)}
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
            <button onClick={NewProduct} style={{marginTop: "8vh", marginLeft:"80vh"}}> Add New Product</button>
         </span>
       </div>
       <hr/>
        <table className="">

         
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Shop</th>
              <th>Action</th>
            </tr>
          
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
              
                <tr  >
                      <th>{key+1}</th>
                      <td>{value.Name}</td>
                      <td>MK {value.Price}</td>
                      <td>{value.Quantity}</td>
                      <td>{value.Description}</td>
                      <td>{value.Shop}</td>
                      <tr>
                        <td ><a className="aEdit" onClick={() => {            
                            navigate("/SupplierSProduct");
                            localStorage.setItem("shopItemId", JSON.stringify(value.id))}}>Edit</a></td>
                        <td><a className="aDelete" onClick={()=>{
                            navigate("/delete");
                            localStorage.setItem("shopId", JSON.stringify(value.id))}}> Delete</a></td>
                      </tr>
                    
                </tr>
                
                    );
                  })}
            </tbody>
         

        </table>

     </div>
   
 
    
  );
}

export default Supplier;