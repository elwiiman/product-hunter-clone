import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Layout from "../../components/layouts/Layout";
import Error404 from "../../components/layouts/404";

const Product = () => {
  //component state
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  //obtain the current product id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //fire base context
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      console.log("id available", id);
      const obtainProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const thisProduct = await productQuery.get();
        if (thisProduct.exists) {
          setProduct(thisProduct.data());
        } else {
          setError(true);
        }
      };
      obtainProduct();
    }
  }, [id]);

  return (
    <Layout>
      <Fragment>{error && <Error404 />}</Fragment>
    </Layout>
  );
};

export default Product;
