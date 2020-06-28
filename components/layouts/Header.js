import React from "react";
import Search from "../ui/Search";
import Nav from "./Nav";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>P</p>
          <Search />
          <Nav />
        </div>
        <div>
          <p>Hi Emmanuel </p>
          <button type="button  ">Close Session</button>
          <Link href="/">
            <a>Login</a>
          </Link>
          <Link href="/">
            <a>Sign In</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
