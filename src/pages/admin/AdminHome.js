import React from "react"
import Myshops from "./Myshops"
import { AppBar} from "@mui/material";
function AdminHome(){
    return(
        <div>
        
            <AppBar sx={{ height:"20vh" ,padding: "5vh"}}>
                <center>
                    <h1>Window Shopping Admin</h1>
               </center>
            </AppBar>
            

            <Myshops/>
          
        </div>

    )
}
export default AdminHome;