import { Fragment, useState, useContext } from "react";
import { css } from "@emotion/core";
import Router, { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";
import FileUploader from "react-firebase-file-uploader";

import { FirebaseContext } from "../firebase";

//validations
import useValidate from "../hooks/useValidate";
import validateCreateProduct from "../validation/validate-create-product";

const initialState = {
  name: "",
  enterprise: "",
  image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  //state for images
  const [imageName, setImageName] = useState("");
  const [upoloading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const [error, setError] = useState(false);
  const { inputValues, errors, handleSubmit, handleChange } = useValidate(
    initialState,
    validateCreateProduct,
    createProduct
  );

  const { name, enterprise, image, url, description } = inputValues;

  //routing hook
  const router = useRouter();

  //context with crud operations
  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    if (!user) {
      return router.push("/login");
    }
    //creating new product object
    const product = {
      name,
      enterprise,
      url,
      urlImage,
      description,
      votes: 0,
      comments: [],
      createdAt: Date.now(),
    };

    //insert in database
    firebase.db.collection("products").add(product);
    return router.push("/");
  }

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleProgress = (progress) => {
    setProgress({ progress });
  };

  const handleUploadError = (error) => {
    setUploading(error);
    console.log(error);
  };

  const handleUploadSuccess = (name) => {
    setProgress(100);
    setUploading(false);
    setImageName(name);

    firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setUrlImage(url);
      });
  };

  return (
    <div>
      <Layout>
        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            New Product
          </h1>

          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Genral Information</legend>

              <Field>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Product name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Field>

              {errors.name && <Error>{errors.name}</Error>}

              <Field>
                <label htmlFor="enterprise">Enterprise</label>
                <input
                  type="text"
                  id="enterprise"
                  placeholder="Enterprise Name"
                  name="enterprise"
                  value={enterprise}
                  onChange={handleChange}
                />
              </Field>

              {errors.enterprise && <Error>{errors.enterprise}</Error>}

              <Field>
                <label htmlFor="image">Image</label>
                <FileUploader
                  accept="image/*"
                  id="image"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage.ref("products")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Field>

              {/* {errors.image && <Error>{errors.image}</Error>} */}

              <Field>
                <label htmlFor="enterprise">URL</label>
                <input
                  type="url"
                  placeholder="URL of your product"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                />
              </Field>

              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>About your product</legend>

              <Field>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Product description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Field>

              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Create Product" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};

export default NewProduct;
