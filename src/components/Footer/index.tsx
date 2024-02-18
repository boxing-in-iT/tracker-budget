import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  background-color: #233142;
  width: 100vw;
  min-height: 10vh;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
`;

const Container = styled.div`
  position: relative;
  width: 75%;
  min-height: 10vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterComponent = () => {
  return (
    <Footer>
      <div>##</div>
      <Container>
        <Box>1</Box>
        <Box>2</Box>
      </Container>
    </Footer>
  );
};

export default FooterComponent;
