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
import Myshops from "./Myshops";

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
    <>
        <AppBar>

          <center>
              <h2>Window shopping Admin</h2>
          </center>
        </AppBar>

        <Myshops/>
      
      
    </>
  );
};

export default TopbarSupplier;
