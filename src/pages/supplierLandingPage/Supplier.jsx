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
           
           <br/><br/>
           <button onClick={NewProduct}> Add New Product</button>
           <TextField style={{margin: "20px", backgroundColor: "#fafafa"}}
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
    
 <div className="cards-container">

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
     
  <div key={key} className="card" style={{background: "#b8b5bd"}}>
     <div  onClick={() => {            
    navigate("/SupplierSProduct");
    localStorage.setItem("shopItemId", JSON.stringify(value.id))
   }}>
            <div className="card__title">{value.Name} </div>
            <div className="card__body">
            <p className="breedname" style={{color: "blue"}}>{value.Quantity} </p>
            <p className="breedname">{value.Description} </p>
            <p className="breedname" style={{color: "#a62703"}}>MK: {value.Price} </p>
            <p className="breedname" style={{fontWeight: "bold"}}>Shop:{value.Shop} </p>
           
            </div>
           </div>
        </div>

        );
      })}

</div>

     </div>
   
 
    
  );
}

export default Supplier;