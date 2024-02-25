import React from "react";
import {
  createBudget,
  createExpense,
  fetchData,
  waait,
} from "../../helpers/helper";
import { Navigate, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import AddBudgetForm from "./src/add-budget-form";
import AddExpenseForm from "./src/add-expense-form";
import { toast } from "react-toastify";
import BudgetItem from "../../components/BudgetItem/budget-item";
import Table from "../../components/Table/table-component";

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

const Title = styled.h1`
  color: #e3e3e3;
`;

const FlexLg = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: start;
  gap: 32px;
`;

const FirstDiv = styled.div`
  width: 70%; /* 3/4 ширины */
`;

const SecondDiv = styled.div`
  width: 30%; /* 1/4 ширины */
`;

const MessageContainer = styled.div`
  margin-top: 10%;
  background-color: #233142;
  padding: 1rem;
  border-radius: 25px;
  color: #e3e3e3;
`;

export const Budgets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const GridMd = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
`;

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  console.log(typeof userName);
  return { userName, budgets, expenses };
}

interface Expenses {
  amount: number;
  budgetId: string;
  createdAt: number;
  id: string;
  name: string;
}

export type UserData = {
  userName: string;
  budgets: [];
  expenses: Expenses[];
};

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as UserData;
  console.log("UserName: ", userName);

  if (!userName) {
    return <Navigate to={"/register"} />;
  }

  const creatingBudget = async ({
    name,
    amount,
  }: {
    name: string;
    amount: number;
  }) => {
    await waait();
    try {
      createBudget({ name: name, amount: amount });
      return toast.success("Бюджет создан");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  };

  const creatingExpense = async ({
    name,
    amount,
    budgetId,
  }: {
    name: string;
    amount: number;
    budgetId: string;
  }) => {
    await waait();
    try {
      createExpense({ name: name, amount: amount, budgetId: budgetId });
      return toast.success("Расход добавлен");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  };

  return userName ? (
    <>
      <DashboardWrapper>
        <Title>Привет, {userName}</Title>

        <GridSm>
          {budgets && budgets.length > 0 ? (
            <>
              <FlexLg>
                {/* <FirstDiv> */}
                <AddBudgetForm creatingBudget={creatingBudget} />
                {/* </FirstDiv> */}
                {/* <SecondDiv> */}
                <AddExpenseForm
                  budgets={budgets}
                  creatingExpense={creatingExpense}
                />
                {/* </SecondDiv> */}
              </FlexLg>
              <h2>Созданные бюджеты</h2>
              <Budgets>
                {budgets.map((budget, id) => (
                  <BudgetItem key={id} budget={budget} />
                ))}
              </Budgets>
              {expenses && expenses.length > 0 ? (
                <GridMd>
                  <h2>Rescent expenses</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 5)}
                  />
                </GridMd>
              ) : (
                <></>
              )}
            </>
          ) : (
            <FlexLg>
              <FirstDiv>
                <AddBudgetForm creatingBudget={createBudget} />
              </FirstDiv>
              <MessageContainer>
                <p>Личный бюджет – это секрет финансовой свободы.</p>
                <p>Создайте бюджет, чтобы начать!</p>
              </MessageContainer>
            </FlexLg>
          )}
        </GridSm>
      </DashboardWrapper>
    </>
  ) : null;
};

export default Dashboard;
