import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation";
import LoginPage from "../../pages/LoginPage";
import FooterComponent from "../Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers/helper";

const Page = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  width: 80vw;
  padding: 2rem;
  flex: 1;
`;

export function mainLoader() {
  const userName = fetchData("userName");
  return userName;
}

const Main = () => {
  const userName = useLoaderData();
  return (
    <Page>
      <Navigation userName={userName} />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <FooterComponent />
    </Page>
  );
};

export default Main;
