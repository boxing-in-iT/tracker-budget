import React from "react";
import { fetchData } from "../../helpers/helper";
import { Navigate, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import AddBudgetForm from "./src/add-budget-form";
import AddExpenseForm from "./src/add-expense-form";

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
  width: 50%; /* 3/4 ширины */
`;

const SecondDiv = styled.div`
  width: 50%; /* 1/4 ширины */
`;

const MessageContainer = styled.div`
  margin-top: 10%;
  background-color: #233142;
  padding: 1rem;
  border-radius: 25px;
  color: #e3e3e3;
`;

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  console.log(typeof userName);
  return { userName, budgets };
}

export type UserData = {
  userName: string;
  budgets: [];
};

const Dashboard = () => {
  const { userName, budgets } = useLoaderData() as UserData;
  console.log("UserName: ", userName);

  if (!userName) {
    return <Navigate to={"/register"} />;
  }

  return userName ? (
    <DashboardWrapper>
      <h1>Привет, {userName}</h1>

      <GridSm>
        {budgets && budgets.length > 0 ? (
          <FlexLg>
            {/* <FirstDiv> */}
            <AddBudgetForm />
            {/* </FirstDiv> */}
            {/* <SecondDiv> */}
            <AddExpenseForm />
            {/* </SecondDiv> */}
          </FlexLg>
        ) : (
          <FlexLg>
            <FirstDiv>
              <AddBudgetForm />
            </FirstDiv>
            <MessageContainer>
              <p>Личный бюджет – это секрет финансовой свободы.</p>
              <p>Создайте бюджет, чтобы начать!</p>
            </MessageContainer>
          </FlexLg>
        )}
      </GridSm>
    </DashboardWrapper>
  ) : null;
};

export default Dashboard;
