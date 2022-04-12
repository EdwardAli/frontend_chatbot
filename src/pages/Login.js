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


function Login() {
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
    axios.post("http://localhost:3002/shop/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
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
    <div className="forum">
   <div className="loginContainer"> 
  
        <h1>Login</h1>
           <div className="loginContainer">
      <label>Shop Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setShopName(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
       {/* ********************************** * */}
      
 {/* *************************************       */}
      <button onClick={register}> Register </button>

    
     </div>
    </div>
    </div>
    
  );
}

export default Login;