import React, { useState, useContext, useEffect } from "react";
import { AutoComplete, Row, Col, Input, Badge, Avatar } from "antd";
import { products } from "../../Utils/ProductsArray";
import "./header.css";
import { GlobalContext } from "../../Context/globalState";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { GetCartDetailsApi } from "../../Api/getCartDetailApi";
import { PostCartDataApi } from "../../Api/postCartDataApi";
import { error, success } from "../../Utils/popup";
import { useNavigate } from "react-router-dom"

export const Header = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const { products, cartCount, setCartCount,cartData } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    getCartCount();
  }, []);

  async function getCartCount() {
    let response = await GetCartDetailsApi();
    if (response.status === 200) {
      let cartData = response?.data[0]?.cartItems;
      setCartCount(cartData.length);
    }
  }

  const mockVal = (str, price, value) => ({
    value: str,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{str}</div>
        <div>
          <p>Price : {price}</p>
          <a
            onClick={() => {
              updateCart(value);
            }}
          >
            Add to Cart
          </a>
        </div>
      </div>
    ),
  });

  async function updateCart(value) {
    let response = await PostCartDataApi(value);
    if (response.status === 200) {
      success(value.name + "is Added to Cart");
      getCartCount();
    } else {
      error("Error in Cart");
    }
  }

  const onSearch = (searchText) => {
    let temp = [];
    if (!searchText) {
      setOptions([]);
    } else {
      products.map(
        (value) => (temp = [...temp, mockVal(value.name, value.price, value)])
      );
      setOptions(temp);
    }
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  return (
    <Row className="header">
      <Col lg={3}></Col>
      <Col lg={17}>
        <AutoComplete
          options={options}
          style={{
            width: 500,
          }}
          onSelect={onSelect}
          onSearch={onSearch}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input.Search size="large" placeholder="input here" enterButton />
        </AutoComplete>
      </Col>
      <Col lg={4}>
        <Row style={{ marginLeft: "50px", cursor: "pointer" }}>
          <Col lg={4} onClick={() => {navigate("/cart")}}>
            <p style={{ color: "white" }}>Cart</p>
          </Col>
          <Col>
            <Badge
              showZero={true}
              count={cartCount}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Avatar icon={<ShoppingCartOutlined />} />
            </Badge>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
