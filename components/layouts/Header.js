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
          <Link href="/">Login</Link>
          <Link href="/">Sign In</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
