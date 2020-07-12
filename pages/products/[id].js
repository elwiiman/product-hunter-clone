import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Layout from "../../components/layouts/Layout";
import Error404 from "../../components/layouts/404";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Field, InputSubmit } from "../../components/ui/Form";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

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

  if (Object.keys(product).length === 0) return "Loading...";

  const {
    name,
    enterprise,
    urlImage,
    url,
    description,
    votes,
    createdAt,
    comments,
  } = product;

  return (
    <Layout>
      <Fragment>{error && <Error404 />}</Fragment>
      <div className="contenedor">
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          {name}
        </h1>
        <ProductContainer>
          <div>
            <p> Published {formatDistanceToNow(new Date(createdAt))}</p>
            <img src={urlImage} />
            <p>{description}</p>

            <h2>Add your comment</h2>
            <form>
              <Field>
                <input type="text" name="message" />
              </Field>
              <InputSubmit type="submit" value="Add comment" />
            </form>

            <h2
              css={css`
                margin: 2rem 0;
              `}
            >
              Comments
            </h2>
            {comments.map((comment) => (
              <li>
                <p>{comment.name}</p>
                <p>Written by: {comment.username}</p>
              </li>
            ))}
          </div>
          <aside>2</aside>
        </ProductContainer>
      </div>
    </Layout>
  );
};

export default Product;
