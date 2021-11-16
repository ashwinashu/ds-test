import React, { useEffect, useContext, useState } from "react";
import { GetCartDetailsApi } from "../../Api/getCartDetailApi";
import { List, Avatar, Button, Pagination } from "antd";
import { GlobalContext } from "../../Context/globalState";
import { Header } from "../Header/header";
import { UpdateCartDataApi } from "../../Api/updateCartDataApi";
import { error, success } from "../../Utils/popup";

export const Cart = () => {
  const { cartData, setCartData, cartCount } = useContext(GlobalContext);
  const [loader,setLoader] = useState(false)
  useEffect(() => {
    getCartData();
  }, [cartCount]);

  async function getCartData() {
      console.log("called")
      setLoader(true)
    let response = await GetCartDetailsApi();
    if (response.status === 200) {
      setCartData(response?.data[0]?.cartItems);
      setLoader(false)
    }
    else{
        error("Network Issue")
        setLoader(false)
    }
  }

  async function removeCartData(ind) {
    let filteredArr = cartData;
    filteredArr.splice(ind, 1);
    setLoader(true)
    let res = await UpdateCartDataApi(filteredArr);
    if (res.status === 200) {
      setCartData(res.data?.cartItems);
      setLoader(false)
      success("Product Removed");
    } else {
      error("Error in Deletion");
      setLoader(false)
    }

  }

  function handleChange(value){
      if(value !== 1){
      let initalIndex = value * 10 - 10;
      let startInd = value - 1
let array = cartData
array.splice(startInd,initalIndex)
setCartData(array)
      }
      else{
          getCartData()
      }
  }
  console.log(cartData);
  return (
    <div>
      <Header />
      <h3>Product Cart</h3>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={cartData}
        loading={loader}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button onClick={() => removeCartData(index)}>Remove</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                style={{marginLeft:"100px"}}
                  src={`https://yumitup-node.herokuapp.com/products/download?fileId=${item.fileId}`}
                />
              }
              title={<a>{item.name}</a>}
            />
          </List.Item>
       
        )}
        
      />
         <Pagination onChange={handleChange} style={{display:"flex",position:"fixed",bottom:2,right:0,height:"50px"}} defaultCurrent={1} total={cartCount} pageSize={10}/>
    </div>
  );
};
