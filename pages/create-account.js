import { Fragment, useState } from "react";
import { css } from "@emotion/core";
import Router from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";

import firebase from "../firebaseModule";

//validations
import useValidate from "../hooks/useValidate";
import validateCreateAccount from "../validation/validate-create-account";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const CreateAccount = () => {
  const [error, setError] = useState(false);
  const { inputValues, errors, handleSubmit, handleChange } = useValidate(
    initialState,
    validateCreateAccount,
    createAccount
  );

  const { name, email, password } = inputValues;

  async function createAccount() {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
    } catch (error) {
      console.log("there was an error", error.message);
      setError(error.message);
    }
  }

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
            Create Account
          </h1>

          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Field>

            {errors.name && <Error>{errors.name}</Error>}
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Create Account" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};

export default CreateAccount;
