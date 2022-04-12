import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    shopName: "",
    phoneNumber:"",
    email:"",
    location: "",
    password: "",
    comfirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    shopName: Yup.string().min(3).max(25).required(),
    phoneNumber: Yup.string().min(10).max(15).required(),
    email: Yup.string().email("Invalid email address format").min(11).max(150).required(),
    location: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    comfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

// onsubmit send the values and navigate to login page
  const onSubmit = (data) => {
    console.log(data)
    axios.post("https://windowshoppingserver.herokuapp.com/shop/register", data).then(() => {
      console.log(data);
      navigate('/login')
    });
  };

  return (
    <div className="createPostPage">
        <h1>Register Shop</h1>
    
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        
        <Form className="formRegisterContainer">
          <label>Shop Name: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="shopName"
            
          />
  <label>Phone number: </label>
          <ErrorMessage name="phone" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="phoneNumber"
          />
          
         <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
         
          />
           
          <label>Location: </label>
          <ErrorMessage name="location" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="location"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
         
          />

          <label>Comfirm Password: </label>
          <ErrorMessage name="comfirmPassword" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="comfirmPassword"
           
          />

          <button type="submit"> Register</button>
          <Link to="/login"><p className="RegisterStatement" style={{color: 'orangered'}}>Already registered? go to login</p></Link>
       
        </Form>
      </Formik>
    </div>
  
   
  );
}

export default Registration;