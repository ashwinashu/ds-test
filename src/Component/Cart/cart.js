import React, { useEffect, useContext } from "react";
import { GetCartDetailsApi } from "../../Api/getCartDetailApi";
import { List, Avatar, Button } from "antd";
import { GlobalContext } from "../../Context/globalState";
import { Header } from "../Header/header";
import { UpdateCartDataApi } from "../../Api/updateCartDataApi";
import { error, success } from "../../Utils/popup";

export const Cart = () => {
  const { cartData, setCartData, cartCount } = useContext(GlobalContext);
  useEffect(() => {
    getCartData();
  }, [cartCount]);

  async function getCartData() {
    let response = await GetCartDetailsApi();
    if (response.status === 200) {
      setCartData(response?.data[0]?.cartItems);
    }
  }

  async function removeCartData(ind) {
    let filteredArr = cartData;
    filteredArr.splice(ind, 1);
    let res = await UpdateCartDataApi(filteredArr);
    if (res.status === 200) {
      setCartData(res.data?.cartItems);
      success("Product Removed");
    } else {
      error("Error in Deletion");
    }
  }

  console.log(cartData);
  return (
    <div>
      <Header />
      <h3 style={{ marginRight: "100px" }}>Product Cart</h3>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={cartData}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button onClick={() => removeCartData(index)}>Remove</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://yumitup-node.herokuapp.com/products/download?fileId=${item.fileId}`}
                />
              }
              title={<a href="https://ant.design">{item.name}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
