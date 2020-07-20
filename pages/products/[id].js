import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Layout from "../../components/layouts/Layout";
import Error404 from "../../components/layouts/404";
import Spinner from "../../components/layouts/Spinner";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const ProductCreator = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Product = () => {
  //component state
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({ message: "" });
  const [consultDB, setConsultDB] = useState(true);

  //obtain the current product id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //fire base context
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    const obtainProduct = async () => {
      const productQuery = await firebase.db.collection("products").doc(id);
      await productQuery.onSnapshot((doc) => {
        if (doc.exists) {
          setProduct(doc.data());
          setConsultDB(false);
        } else {
          setError(true);
          setConsultDB(false);
        }
      });
    };

    if (id && consultDB) {
      console.log("effect executed");
      obtainProduct();
    }
  }, [id, consultDB]);

  function handleSnapshot(snapshot) {
    // const product = snapshot.docs.map((doc) => {
    //   return { id: doc.id, ...doc.data() };
    // });
    console.log(snapshot.docs);
    // setProducts(products);
  }

  useEffect(() => {
    if (user) {
      setComment({ ...comment, userId: user.uid, userName: user.displayName });
    }
  }, [user]);

  if (error)
    return (
      <Layout>
        <Error404 error="Product doesn't exist" />
      </Layout>
    );

  if (Object.keys(product).length === 0)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  const {
    name,
    enterprise,
    urlImage,
    url,
    description,
    votes,
    whoHasVoted,
    createdAt,
    createdBy,
    comments,
  } = product;

  //admin and validate votes
  const voteProduct = () => {
    if (!user) {
      return router.push("/login");
    }

    if (whoHasVoted.includes(user.uid)) return;

    //add this user to whoHasVoted array
    const newWhoHasVoted = [...whoHasVoted, user.uid];

    //obtain and sum a vote
    const newTotalVotes = votes + 1;

    //update in db and update state
    setProduct({ ...product, votes: newTotalVotes });
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: newTotalVotes, whoHasVoted: newWhoHasVoted });
    setConsultDB(true);
  };

  //functions to create comments
  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  //identifies if comment is of the product creator

  const isCreator = (id) => {
    if (createdBy.id == id) {
      return true;
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }

    //adding extra info to comment
    // setComment({ ...comment, userId: user.uid, userName: user.displayName });

    //take a copy of existing comment and adding
    const newComments = [...comments, comment];

    //update state and db
    firebase.db
      .collection("products")
      .doc(id)
      .update({ comments: newComments });

    setProduct({ ...product, comments: newComments });
    setComment({ ...comment, message: "" });
    setConsultDB(true);
  };

  // function to check if product creator is the same than user authenticated
  const canDelete = () => {
    if (!user) return false;
    if (createdBy.id === user.uid) return true;
  };

  //delete product of firebase db
  const deleteProduct = async () => {
    if (!user) return router.push("/login");
    if (createdBy.id !== user.uid) router.push("/login");
    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
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
            {user ? (
              <p>
                Created by: {createdBy.name} of {enterprise}
              </p>
            ) : (
              "User not Available"
            )}

            <p> Published {formatDistanceToNow(new Date(createdAt))}</p>

            <img src={urlImage} />
            <p>{description}</p>

            {user && (
              <>
                <h2>Add your comment</h2>
                <form onSubmit={addComment}>
                  <Field>
                    <input
                      type="text"
                      name="message"
                      onChange={handleCommentChange}
                      value={comment.message}
                    />
                  </Field>
                  <InputSubmit type="submit" value="Add comment" />
                </form>
              </>
            )}

            <h2
              css={css`
                margin: 2rem 0;
              `}
            >
              Comments
            </h2>
            {comments.length === 0 ? (
              <p>There are no comments yet</p>
            ) : (
              <ul>
                {comments.map((comment, i) => (
                  <li
                    key={`${comment.userId}-${i}`}
                    css={css`
                      border: 1px solid #e1e1e1;
                      padding: 2rem;
                    `}
                  >
                    <p>{comment.message}</p>
                    <p>
                      Written by:{" "}
                      <span
                        css={css`
                          font-weight: bold;
                        `}
                      >
                        {comment.userName}{" "}
                      </span>
                    </p>
                    {isCreator(comment.userId) && (
                      <ProductCreator>Creator </ProductCreator>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside>
            <Button target="_blank" bgColor="true" href={url}>
              Visit Url
            </Button>

            <div
              css={css`
                margin-top: 5rem;
              `}
            >
              <p
                css={css`
                  text-align: center;
                `}
              >
                {votes} Votes
              </p>
            </div>

            {user && (
              <Button onClick={voteProduct}>
                {whoHasVoted.includes(user.uid)
                  ? "You have already voted"
                  : "Vote"}
              </Button>
            )}
          </aside>
        </ProductContainer>

        {canDelete() && <Button onClick={deleteProduct}>Delete Product</Button>}
      </div>
    </Layout>
  );
};

export default Product;
