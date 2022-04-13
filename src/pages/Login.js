import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { styled } from '@mui/material/styles';
import R from '../image/IMG-20220120-WA0010.png';
import User from '../image/login.jpg';
import Input from '@mui/material/Input';
import { SearchOutlined } from '@material-ui/icons';
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function Login() {
  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);


  let navigate = useNavigate();

  const back = () => {
    navigate("/web");
};

  const register = () => {
        navigate("/registration");
  };


  //function for the user to login upon clicking login button
  const login = () => {
    
    const data = { shopName:shopName, password: password };
    console.log(data);
    axios.post("https://windowshoppingserver.herokuapp.com/shop/login", data).then((response) => {
      if (response.data.error) {
        alert("shop name and password do not match");
      } else {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("id", response.data.id);
        setAuthState({
          shopName: response.data.shopName,
          id: response.data.id,
          status: true,
        });
        
        // navigate("/")
        const role=response.data.role;
        // default 
          navigate("/supplier");
        }
        //   // default login for admin
        // if(role==="admin"){
        //   navigate("/admin");
        // }
        
    });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
      <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                     <h2>Login</h2>
                      </Grid>
        <TextField label='Shopname' placeholder='Enter shopname' fullWidth required onChange={(event) => {setShopName(event.target.value);}}/>
        <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={(event) => {setPassword(event.target.value);}}/>
        <Button type='submit' color='primary' variant="contained" onClick={login} style={btnstyle} fullWidth>Login</Button>
        <Button type='submit' color='primary' variant="contained" onClick={register} style={btnstyle} fullWidth>Register</Button>

      
       {/* ********************************** * */}
      
 {/* *************************************       */}
 

    
    
    </Paper>
    </Grid>
  );
}

export default Login;