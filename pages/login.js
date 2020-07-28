import { Fragment, useState } from "react";
import { css } from "@emotion/core";
import Router from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";

import firebase from "../firebaseModule";

//validations
import useValidate from "../hooks/useValidate";
import validateLogin from "../validation/validate-login";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(false);
  const { inputValues, errors, handleSubmit, handleChange } = useValidate(
    initialState,
    validateLogin,
    login
  );

  const { email, password } = inputValues;

  async function login() {
    try {
      const user = await firebase.login(email, password);
      console.log(user);
      Router.push("/");
    } catch (error) {
      console.log("there was an error in authenticate user", error.message);
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
            Login
          </h1>

          <Form onSubmit={handleSubmit} noValidate>
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
            <InputSubmit type="submit" value="Login" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};

export default Login;
