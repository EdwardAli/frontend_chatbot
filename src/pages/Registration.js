import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import * as Yup from "yup";
import axios from "axios";
import '../pages/Registration.css'

function Registration() {
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const paperStyle = { padding: 20, width: 600, margin: "0 auto" }
  const fieldStyle={fontSize:30, margin:'4px 0', padding: 5}
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
    location: Yup.string().min(2).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    comfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

// onsubmit send the values and navigate to login page
  const onSubmit = (data) => {
    console.log(data)
    axios.post("https://windowshoppingserver.herokuapp.com/shop/register", data).then(() => {
      console.log(data);
      navigate('/')
    });
  };

  return (
    <Grid className="createPostPage">
        
      <Paper style ={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon/>
          </Avatar>
          <h1>Register Shop</h1>
        </Grid>
      
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
        
        <Form className="formRegisterContainer">
        <Field as={TextField}
          style={fieldStyle}
          fullWidth 
          autocomplete="off"
          name="shopName"
          label= "Shop name"
          placeholder="Enter your shopname"
          helperText={<ErrorMessage name="username" component="span" />} />
         <Field  as={TextField}
              style={fieldStyle}
              autocomplete="off"
              label="Phone Number :"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              helperText={<ErrorMessage name="phone" component="span" />}
            />
                    
          <Field  as={TextField}
              autocomplete="off"
              style={fieldStyle}
              type="email"
              label="Email"
              placeholder="Enter Your Email"
              name="email"
              helperText={<ErrorMessage name="email" component="span" />}
            />
          
          <Field  as={TextField}
              autocomplete="off"
              style={fieldStyle}
              label="Location"
              name="location"
              placeholder="Enter your Location"
              helperText={<ErrorMessage name="location" component="span" />}
            />
            
            
          <Field  as={TextField}
              autocomplete="off"
              style={fieldStyle}
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              helperText={<ErrorMessage name="password" component="span" />}
            />
            
          <Field  as={TextField}
              autocomplete="off"
              style={fieldStyle}
              type="password"
              label="Confrim Password"
              placeholder="Confirm Password"
              name="comfirmPassword"
              helperText={<ErrorMessage name="comfirmPassword" component="span" />}
            />

            <div className="">
              <Button className="" type="submit"> Register</Button>
              <Link to="/" className=""><p className="RegisterStatement" style={{color: 'orangered'}}>Already registered? | Home</p></Link>
            </div>
          </Form>
        </Formik>
      </Paper>
    </Grid>
  
   
  );
}

export default Registration;