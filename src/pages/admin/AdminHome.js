import React from "react"
import Myshops from "./Myshops"
import { AppBar} from "@mui/material";
function AdminHome(){
    return(
        <div>
        
            <AppBar sx={{ height:"18vh" }}>
                <center>
                    <h2>Window Shopping Admin</h2>
               </center>
            </AppBar>
            

            <Myshops/>
          
        </div>

    )
}
export default AdminHome;