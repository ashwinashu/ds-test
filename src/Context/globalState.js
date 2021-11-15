import React, { createContext, useReducer } from "react";
import AppReducer from "./reducer"

const initialState = {
    products : []
  
}


export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setProducts(data) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: data,
        });
      }
    
    return (
        <GlobalContext.Provider
        value={{ 
            products:state.products,
            setProducts
        }}
        >
        {children}
        </GlobalContext.Provider>
    )
}