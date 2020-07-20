import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import { useRouter } from "next/router";
import DetailProduct from "../components/layouts/DetailProduct";
import useProducts from "../hooks/useProducts";

const Search = () => {
  const router = useRouter();
  const {
    query: { q: search },
  } = router;

  //All products

  const { products } = useProducts("createdAt");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (search && products) {
      const searchLowCase = search.toLowerCase();
      const searchFilter = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchLowCase) ||
          product.description.toLowerCase().includes(searchLowCase)
        );
      });

      setFilteredProducts(searchFilter);
    }
  }, [search, products]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {filteredProducts.map((product) => (
                <DetailProduct key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
