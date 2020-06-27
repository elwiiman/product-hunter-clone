import Head from "next/head";
import styled from "@emotion/styled";

const Heading = styled.h1`
  color: red;
`;

export default function Home() {
  return (
    <div className="container">
      <Heading>Start</Heading>
    </div>
  );
}
