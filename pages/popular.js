import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import DetailProduct from "../components/layouts/DetailProduct";
import useProducts from "../hooks/useProducts";

const Popular = () => {
  const { products } = useProducts("votes");
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map((product) => (
                <DetailProduct key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Popular;
