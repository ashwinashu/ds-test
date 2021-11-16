import axios from "axios"

export const UpdateCartDataApi = async(array) => {

    let data ={
        cartItems : array,
        email : "ashwinraj710@gmail.com"
    }
let response 
let baseUrl = process.env.REACT_APP_BASE_URL + "/products/cart?email=" + "ashwinraj710@gmail.com"

 response = await axios.patch(baseUrl,data)
.then(response => response )
    .catch(error =>  error);
    return response
      
}