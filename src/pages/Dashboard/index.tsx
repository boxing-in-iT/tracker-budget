import React from "react";
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../../helpers/helper";
import { Link, Navigate, useLoaderData } from "react-router-dom";
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

  @media (max-width: 64em) {
    flex-direction: column;
  }
`;

const FirstDiv = styled.div`
  width: 70%; /* 3/4 ширины */
  @media (max-width: 64em) {
    width: 100%; /* 3/4 ширины */
  }
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

  @media (max-width: 64em) {
    /* flex-direction: column; */
    flex-wrap: nowrap;
    overflow-x: scroll;
    gap: 200px;
  }
`;

export const GridMd = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  background-color: #f95959;
  text-decoration: none;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d63737;
  }
  margin-left: auto; /* Прижимаем к правой стороне */
`;

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  console.log(typeof userName);
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }: any) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createBudget")
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Бюджет создан");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }

  if (_action === "createExpense") {
    try {
      //create an expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Расход ${values.newExpense} добавлен!`);
    } catch (e) {
      throw new Error("There was a problem added your expense.");
    }
  }

  if (_action === "deleteBudget") {
    try {
      //delete an expense
      deleteItem({
        key: "budgets",
        id: values.budgetId,
      });
      return toast.success(`Бюджет удален`);
    } catch (e) {
      throw new Error("There was a problem deleteing your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      //delete an expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleteing your expense.");
    }
  }
}

interface Expenses {
  amount: number;
  budgetId: string;
  createdAt: number;
  id: string;
  name: string;
}

interface Budget {
  amount: number;
  color: string;
  createdAt: number;
  id: string;
  name: string;
}

export type UserData = {
  userName: string;
  budgets: Budget[];
  expenses: Expenses[];
};

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as UserData;
  console.log("UserName: ", userName);

  if (!userName) {
    return <Navigate to={"/register"} />;
  }

  // const creatingBudget = async ({
  //   name,
  //   amount,
  // }: {
  //   name: string;
  //   amount: number;
  // }) => {
  //   await waait();
  //   try {
  //     createBudget({ name: name, amount: amount });
  //     return toast.success("Бюджет создан");
  //   } catch (e) {
  //     throw new Error("There was a problem creating your budget.");
  //   }
  // };

  // const creatingExpense = async ({
  //   name,
  //   amount,
  //   budgetId,
  // }: {
  //   name: string;
  //   amount: number;
  //   budgetId: string;
  // }) => {
  //   await waait();
  //   try {
  //     createExpense({ name: name, amount: amount, budgetId: budgetId });
  //     return toast.success("Расход добавлен");
  //   } catch (e) {
  //     throw new Error("There was a problem creating your budget.");
  //   }
  // };

  return userName ? (
    <>
      <DashboardWrapper>
        <Title>Привет, {userName}</Title>

        <GridSm>
          {budgets && budgets.length > 0 ? (
            <>
              <FlexLg>
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </FlexLg>
              <h2>Созданные бюджеты</h2>
              <Budgets>
                {budgets
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 3) // Первые три элемента
                  .map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
              </Budgets>
              {budgets.length > 3 && (
                <StyledLink to={"/budgets"}>Посмотреть все бюджеты</StyledLink>
              )}
              {expenses && expenses.length > 0 ? (
                <GridMd>
                  <h2>Недавние расходы</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 3)}
                  />
                  {expenses.length > 5 && (
                    <StyledLink to={"/expenses"}>
                      Посмотреть все расходы
                    </StyledLink>
                  )}
                </GridMd>
              ) : (
                <></>
              )}
            </>
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
    </>
  ) : null;
};

export default Dashboard;
