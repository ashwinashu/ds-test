import React,{useContext,useEffect, useState} from 'react'
import { Layout,Spin } from "antd";
import {Header as Head} from "../Header/header"
import { Products } from '../Content/products';
import { GlobalContext } from '../../Context/globalState';
import { GetProductsApi } from '../../Api/getProductsApi';
import { error } from '../../Utils/popup';

export const Home = () => {
  const {products, setProducts} = useContext(GlobalContext);
  const [loader,setLoader] = useState(false)
  useEffect(() => {
    getProducts();
  }, []);

  const { Footer, Sider, Content, Header } = Layout;

  async function getProducts() {
    setLoader(true)
    let response = await GetProductsApi();
    if (response.status === 200) {
      setProducts(response.data);
      setLoader(false)
    }
    else{
      error("Error in Fetching Data")
      setLoader(false)
    }
  }
    return (
                  <Layout>
        <Header style={{ height: "100%" }}>
          <Head />
        </Header>
        <Layout>
          <Sider style={{ height: "900px" }} width={260}>
            Sider
          </Sider>
          <Content>{loader ? <Spin style={{marginTop:"250px"}} tip="Loading" /> : <Products/> }</Content>
        </Layout>
      </Layout>
    )
}
