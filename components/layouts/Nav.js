import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/">
        <a>Popular</a>
      </Link>
      <Link href="/">
        <a>New Product</a>
      </Link>
    </nav>
  );
};

export default Nav;
