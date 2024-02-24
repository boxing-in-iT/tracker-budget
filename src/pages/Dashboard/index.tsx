import React from "react";
import { fetchData } from "../../helpers/helper";
import { Navigate, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import AddBudgetForm from "./src/add-budget-form";

const DashboardWrapper = styled.div`
  display: grid;
  gap: 32px;
  place-items: start;
  width: 100%;
`;

const GridSm = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
`;

const FlexLg = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: start;
  gap: 32px;
`;

const FirstDiv = styled.div`
  width: 75%; /* 3/4 ширины */
`;

const SecondDiv = styled.div`
  width: 25%; /* 1/4 ширины */
`;

export function dashboardLoader() {
  const userName = fetchData("userName");
  console.log(typeof userName);
  return { userName };
}

export type UserData = {
  userName: string;
};

const Dashboard = () => {
  const { userName } = useLoaderData() as UserData;
  console.log("UserName: ", userName);

  if (!userName) {
    // Выполните редирект, обернув его в условие внутри useEffect
    return <Navigate to={"/register"} />;
  }

  return userName ? (
    <DashboardWrapper>
      <h1>Привет, {userName}</h1>
      <GridSm>
        <FlexLg>
          <FirstDiv>
            <AddBudgetForm />
          </FirstDiv>
          <SecondDiv>2</SecondDiv>
        </FlexLg>
      </GridSm>
    </DashboardWrapper>
  ) : null;
};

export default Dashboard;
