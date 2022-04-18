import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field,TextField, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import './supplierProducts.css';


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

  useEffect(()=>{
    setShopId(localStorage.getItem("id"))
}, [])


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

  const onSubmit = (data) => {
  
    
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
      <p>Fill in</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Name: </label>
          <ErrorMessage name="Name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Name" 
          />
           <label>Quantity: </label>
          <ErrorMessage name="Category" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Quantity"
            >
           
          </Field>


          <label>Description: </label>
          <ErrorMessage name="Description" component="span" />
          <Field
            autocomplete="off"
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
          
          <button type="submit" style={{cursor: "pointer"}}> Add</button>
          {/* ********************************** * */}
        
 {/* *************************************       */}
    
        </Form>
      </Formik>
    </center>
  );
}

export default SupplierProducts;