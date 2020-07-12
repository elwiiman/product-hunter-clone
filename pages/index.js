import React, { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import DetailProduct from "../components/layouts/DetailProduct";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    // const handleSnapshot = (snapshot) => {
    //   const products = snapshot.docs.map((doc) => {
    //     return { id: doc.id, ...doc.data() };
    //   });
    //   console.log(products);
    // };
    const obtainProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("createdAt", "desc")
        .onSnapshot(handleSnapshot);
    };
    obtainProducts();
  }, []);

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setProducts(products);
  }
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

export default Home;
