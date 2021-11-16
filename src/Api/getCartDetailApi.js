import axios from "axios"

export const GetCartDetailsApi = async() => {
let response 
let baseUrl =  process.env.REACT_APP_BASE_URL + "/products/cart?email=ashwinraj710@gmail.com"

 response = await axios.get(baseUrl)
.then(response => response )
    .catch(error =>  error);
    return response
      
}