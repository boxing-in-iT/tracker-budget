import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import styled from "styled-components";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";

const Page = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.div`
  width: 80vw;
  flex: 1;
`;

function App() {
  return (
    <Page>
      <Navigation />
      <Main>
        <WelcomePage />
      </Main>
      <Footer />
    </Page>
  );
}

export default App;
