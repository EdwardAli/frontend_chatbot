import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

//function for the user to login upon clicking login button 
function Login() {
  //initialising classes to the methodof UseStyles() method
  const paperStyle={padding :20,height:'70vh', width: 380, margin:" 10px auto"}
  const textfieldStyle={fontSize:30, margin:'8px 0', padding: 5}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0',padding: 5, color:"white"}
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);


  let navigate = useNavigate();

  //letting the user to navigate
  const register = () => {
        navigate("/registration");
  };


  //function for the user to login upon clicking login button
  const login = () => {
    
    const data = { shopName:shopName, password: password };
    console.log(data);
    //checki if shop name matches the password and then navigate to admin 
    if(data.shopName==="admin" && data.password ==="admin"){
      navigate("/admin")
    }
    else{
      //posting user data to the the server if the password and shopname match 
      axios.post("https://windowshoppingserver.herokuapp.com/shop/login", data).then((response) => {
      if (response.data.error) {

        //alert the user if the shop and password do not match
        alert("shop name and password do not match");
      }
    
      else {
        //setting access token for a particular user 
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
    }
    
  };
  return (
    <center>
      {/**login form  */}
      <Paper elevation={10} style={paperStyle}>
        {/**Welcome message on the page */}
      <h3>Welcome to Window Shopping</h3>
      <Grid align='center'>
        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Login</h2>
      </Grid>
      {/**Textfield for the login form  */}
        <TextField label='Shopname' style={textfieldStyle} placeholder='Enter shopname' variant="outlined" fullWidth required onChange={(event) => {setShopName(event.target.value);}}/>
        <TextField label='Password' style={textfieldStyle} placeholder='Enter password' variant="outlined" type='password' fullWidth required onChange={(event) => {setPassword(event.target.value);}}/>
        {/**Login and register button */}
        <Button type='submit' color='primary' variant="contained" onClick={login} style={btnstyle} fullWidth>Login</Button>
        <Button type='submit' color='primary' variant="contained" onClick={register} style={btnstyle} fullWidth>Register</Button>
      </Paper>
    </center>
  );
}

export default Login;