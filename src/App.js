import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, NavLink } from "react-router-dom";
import {  PermIdentity, PostAdd, NotificationsNone, PowerSettingsNewOutlined } from "@material-ui/icons";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from 'react-router-dom';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Supplier from "./pages/supplierLandingPage/Supplier";
import SupplierMarket from "./pages/supplierMarket/SupplierMarket";
import SupplierProducts from "./pages/supplierProducts/SupplierProducts";
import SupplierSProduct from "./pages/supplierSproduct/SupplierSProduct";
import TopbarSupplier  from "./components/topbarSupplier/TopbarSupplier";
import { Typography } from '@material-ui/core';
import AdminHome from "./pages/admin/AdminHome";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0.7;
  top: 0;
  left: 0.71;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 120,
  bgcolor: 'whitesmoke',
  borderRadius: 5,
 // bgcolor: 'background.paper',
  //border: '2px solid blue',

  margin: 1,
  p: 2,
  px: 4,
  pb: 3,
};

const AdminLayout = () => (
 
  <>
    <TopbarSupplier/>      
    <Outlet />
    </>
);

function App() {
  //assigning classes to the method useStyles()
  const classes = useStyles();

   // for the register livestock modal
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  const [authState, setAuthState] = useState({
    shopName: "",
    id: 0,
    status: false,
  });

//persist state after refreshing the page
  useEffect(()=> {
  const data = localStorage.getItem('maintain-logged-in-state');
  if(data) {
    setAuthState(JSON.parse(data));
  }
  },[]);

useEffect(()=> {
  localStorage.setItem("maintain-logged-in-state", JSON.stringify(authState));
});

// verify that the user has a valid token and is aunthticated
  useEffect(() => {
    axios
      .get("http://localhost:3002/shop/login", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            shopName: response.data.shopName,
            id: response.data.id,
            status: true,
          });
        }
      });
    
  }, []);

//logout function 
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    setAuthState({ shopName: "", id: 0, status: false });
    handleClose() 
  };

 
  
  return (
   
    <div className="App">
     
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
      
          <div className="navbar">
          <div className="topbar_main">
            <div className="links">
            {!authState.status ? (
                <> 
                 
                </>
              ) : (
                <>
                </>
              )}
            </div>
           
            <div className="loggedInContainer">
            <h3 style={{color: "black", padding: "15px"}}> {authState.shopName}
            {authState.status && <>
          
            </>}
            
              </h3>
            <></>
         
            <></>
    
            {authState.status && <PermIdentity onClick={handleOpen}  className={classes.root}> </PermIdentity>}
            <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}>
        <Box sx={style}>
        
        <Link to="/">
      
       <p onClick={logout} className="popup"><PowerSettingsNewOutlined/>Logout</p>
       </Link>
      
        
        </Box>
      </StyledModal>

      {/* <h3>{authState.username} </h3> */}
      </div> 
           </div>
        
      </div>
      
        
        <div className="container">
          {/**Routes for each and every page */}
       <Routes>
          <Route path="/registration" exact element={<Registration/>} />
          <Route path="/" exact element={<Login/>} />
          <Route element={<AdminLayout/>}>  
          <Route path="/supplier" exact element={<Supplier/>} />
          <Route path="/supplierProducts" exact element={<SupplierProducts/>} />
          <Route path="/supplierSProduct" exact element={<SupplierSProduct/>} />
          <Route path="/supplierMarket" exact element={<SupplierMarket/>} />
          <Route path="/admin" exact element={<AdminHome/>} />
          
        </Route>
       </Routes>
       </div>
        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;