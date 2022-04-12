import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import User from '../image/login.jpg';

function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    Name: "",
    Category:"",
    Description:"",
    Price: "",
    
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string().min(3).max(150).required(),
    Category: Yup.string().min(1).max(150).required(),
    Description: Yup.string().min(11).max(150).required(),
    Price: Yup.string().min(1).max(15).required(),
    
  });

// onsubmit send the values and navigate to login page
var id = localStorage.getItem("id");
  const onSubmit = (data) => {
    axios.post(`https://windowshoppingserver.herokuapp.com/product/create/${id}`, data).then(() => {
      console.log(data);
      navigate('/');
    });
  };

  

  return (
    <div className="loginContainer">
        <h1>Add Product(s)</h1>
        <img src={User} alt="login symbol" style={{ height: "70px", width: "70px"}} />
     <div className="loginContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        
        <Form className="loginContainer">
          <label>Name: </label>
          <ErrorMessage name="Name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Name"
            
          />
  <label>Category: </label>
          <ErrorMessage name="Category" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Category"
          />
          
         <label>Description: </label>
          <ErrorMessage name="Description" component="span" />
          <Field
            autocomplete="off"
            type="text"
            id="inputCreatePost"
            name="Description"
         
          />
           <label>Price: </label>
          <ErrorMessage name="Price" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Price"
            type="number"
          />
  
           <button type="submit"> Add Product</button>
       
        </Form>
      </Formik>
    </div>
   </div>
   
  );
}

export default Registration;