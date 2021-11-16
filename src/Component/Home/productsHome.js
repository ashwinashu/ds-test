import React,{useContext,useEffect} from 'react'
import { Layout } from "antd";
import {Header as Head} from "../Header/header"
import { Products } from '../Content/products';
import { GlobalContext } from '../../Context/globalState';
import { GetProductsApi } from '../../Api/getProductsApi';

export const Home = () => {
  const {products, setProducts} = useContext(GlobalContext);
  useEffect(() => {
    getProducts();
  }, []);

  const { Footer, Sider, Content, Header } = Layout;

  async function getProducts() {
    let response = await GetProductsApi();
    if (response.status === 200) {
      setProducts(response.data);
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
          <Content><Products/></Content>
        </Layout>
      </Layout>
    )
}
