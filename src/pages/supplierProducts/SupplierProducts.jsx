import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field,ErrorMessage } from "formik";
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import './supplierProducts.css';

//function for rendering products of a specific shop
function SupplierProducts() {
  let { id } = useParams();
  const[ShopId, setShopId] = useState();
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    Name: "",
    Quantity: "",
    Description: "",
    Price:"",
  };
//getting products
  useEffect(()=>{
    setShopId(localStorage.getItem("id"))
}, [])

//getting the access token for a particular user
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/login");
     
    }
  }, []);
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("You must input a Product Name!"),
    Quantity: Yup.string().required(),
    Description: Yup.string().required(),
    Price: Yup.string().required(),
  });
  //sending the newly added product in the shop
  const onSubmit = (data) => {
  
  //sending the newly added product to the server and navigate to server
   var id = localStorage.getItem("id");
   console.log(data);
    axios
      .post(`https://windowshoppingserver.herokuapp.com/product/create/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/supplier");
      });
  };

  return (
    <center className="createPostPage">
      {/**A form for adding the new product */}
      <p>Fill in</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
         
          <Field  as={TextField}
            autocomplete="off"
            label="Product Name"
            placeholder="Enter your product name"
            name="Name"
            helperText={<ErrorMessage name="Name" component="span" />}/>
           
          
          <Field  as={TextField}
            autocomplete="off"
            label="Quantity"
            placeholder="Quantity"
            name="Quantity"
            helperText ={<ErrorMessage name="Quantity" component="span" />}
            />
          <Field as = {TextField}
            autocomplete="off"
            label="Description"
            placeholder="Enter product description"
            name="Description"
            helperText={<ErrorMessage name="Description" component="span" />}/>
          
          <Field as ={TextField}
            autocomplete="off"
            label="Price"
            placeholder="Enter Product Price"
            name="Price"
            type="number"
           helperText={<ErrorMessage name="Price" component="span" />}/>
          
          <button type="submit" style={{cursor: "pointer"}}> Add</button>
        
    
        </Form>
      </Formik>
    </center>
  );
}

export default SupplierProducts;