import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
let navigate = useNavigate();

function DeProduct(){
  let { id } = useParams();
  
    var id = localStorage.getItem("id");
      //deleting the product 
 const deleteProduct =()=>{
    axios
      .delete(`https://windowshoppingserver.herokuapp.com/product/delete/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/supplier");
      });
    };
    
    return(
      <div>
        {deleteProduct}
      </div>
    )
}


export default DeProduct;