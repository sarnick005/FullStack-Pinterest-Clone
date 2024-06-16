import React from "react";
import styled from "@emotion/styled";
import Pin from "../Pin/Pin";

function Home() {
  const Wrapper = styled.div`
    background-color: #fff;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    margin-top: 15px;
  `;
  const Container = styled.div`
    display: flex;
    width: 80%;
    background-color: #fff;
  `;
  return (
    <Wrapper>
      <Container>
        <Pin />
      </Container>
    </Wrapper>
  );
}

export default Home;
