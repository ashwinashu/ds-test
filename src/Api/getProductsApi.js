import axios from "axios"

export const GetProductsApi = async() => {
let response 
let baseUrl =  process.env.REACT_APP_BASE_URL + "/yumitup/products"

 response = await axios.get(baseUrl)
.then(response => response )
    .catch(error =>  error);
    return response
      
}