import React, { useState,useContext } from 'react';
import { AutoComplete,Row,Col,Input,Badge,Avatar } from 'antd';
import {products} from "../../Utils/ProductsArray"
import "./header.css"
import { GlobalContext } from '../../Context/globalState';
import {ShoppingCartOutlined} from "@ant-design/icons"
 

export const Header = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const {products, setProducts} = useContext(GlobalContext);

  const mockVal = (str,price) => ({
    value: str,
    label : (
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <div>{str}</div>
      <div><p>Price : {price}</p><a>Add to Cart</a></div>
      </div>
    )
  });

  const onSearch = (searchText) => {
    let temp = []
   if(!searchText){
     setOptions([])
   }else{
     products.map((value) => (
 temp = [...temp,mockVal(value.name,value.price)]
     ))
     setOptions(temp)
  };
}


  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  return (
    <Row className="header">
        <Col lg={3}></Col>
        <Col lg={20}>
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
      <Col>
      <Badge count={2} style={{display:"flex",justifyContent:"space-between"}}>
         <Avatar icon={<ShoppingCartOutlined />} />
      </Badge>
      </Col>
    </Row>
  );
};