import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../Context/globalState";
import { Card, Row, Col, Image } from "antd";

export const Products = () => {
  const { products } = useContext(GlobalContext);
  const { Meta } = Card;
  return (
    <div>
      {products.length > 0 && (
        <Row style={{ margin: "20px" }}>
          {products.map((value, index) => (
            <Col style={{ marginTop: "60px" }} span={6}>
              <Card
                key={index}
                hoverable
                style={{ width: 240, height: 300 }}
                cover={
                  <img
                    style={{ maxHeight: "200px" }}
                    src={`https://yumitup-node.herokuapp.com/products/download?fileId=${value.fileId}`}
                  />
                }
              >
                <Meta title={value.name} description="www.instagram.com" />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
