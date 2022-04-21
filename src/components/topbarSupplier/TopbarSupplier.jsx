import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {  Link } from "react-router-dom";
import DrawerSup from './DrawerSupplier';
import { useNavigate } from "react-router-dom";

const TopbarSupplier = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const ShopProducts = () =>{
    navigate("/supplier");
  };
  const NewProduct = () =>{
    navigate("/supplierProducts");
  };
  const AllProducts = () =>{
    navigate("/supplierMarket");
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#343857", marginTop:"65px" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" , color:"black" }}>
                Window Shoping
              </Typography>
              <DrawerSup />
            </>
          ) : (
            <>
              <Tabs
                sx={{ flexGrow: 1 }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                centered
              >
            
                <Tab label="My Products" onClick={ShopProducts}/>
                {/* <Tab label="New Product" onClick={NewProduct}/> */}
                <Tab label="All Supplies" onClick={AllProducts}/>
             
              </Tabs>
           
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TopbarSupplier;
