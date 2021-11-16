import axios from "axios"

export const PostCartDataApi = async(data) => {
let response 
let baseUrl =  process.env.REACT_APP_BASE_URL + "/products/cart"
let temp = []
temp.push(data)
let cartData = {
    cartItems : temp,
    email : "ashwinraj710@gmail.com"
}
console.log(cartData)
 response = await axios.post(baseUrl,cartData)
.then(response => response )
    .catch(error =>  error);
    return response
      
}