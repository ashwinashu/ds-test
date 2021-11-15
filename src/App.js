import React,{useEffect,useContext} from "react"
import "./App.css";
import { Layout } from "antd";
import { Header as Head } from "./Component/Header/header";
import "antd/dist/antd.css";
import { GetProductsApi } from "./Api/getProductsApi";
import { GlobalContext } from './Context/globalState';

function App() {
  const {products, setProducts} = useContext(GlobalContext);
  useEffect(() => {
    getProducts();
  }, []);


  async function getProducts() {
    let response = await GetProductsApi();
    if (response.status === 200) {
      setProducts(response.data);
    }
  }

  const { Footer, Sider, Content, Header } = Layout;
  return (
    <div>
      <Layout>
        <Header style={{ height: "100%" }}>
          <Head />
        </Header>
        <Layout>
          <Sider style={{ height: "900px" }} width={260}>
            Sider
          </Sider>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
