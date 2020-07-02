import React, { Fragment, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Search from "../ui/Search";
import Nav from "./Nav";
import Link from "next/link";
import Button from "../ui/Button";
import FirebaseContext from "../../firebase/context";
import Router from "next/router";

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Search />
          <Nav />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <Fragment>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                {user.displayName}
              </p>
              <Button
                bgColor="true"
                type="button"
                onClick={() => {
                  firebase.signout();
                  Router.push("/login");
                }}
              >
                Close Session
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/login">
                <Button bgColor="true">Login</Button>
              </Link>
              <Link href="/create-account">
                <Button>Sign In</Button>
              </Link>
            </Fragment>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
