import React from "react";
import { fetchData } from "../../helpers/helper";
import Table from "../../components/Table/table-component";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div``;

const Title = styled.h1`
  color: #e3e3e3;
`;

export const expenseLoader = async () => {
  const userName = fetchData("userName");
  const expenses = fetchData("expenses");
  return { userName, expenses };
};

interface Expenses {
  amount: number;
  budgetId: string;
  createdAt: number;
  id: string;
  name: string;
}

export type UserData = {
  userName: string;
  expenses: Expenses[];
};

const ExpensePage = () => {
  const { expenses, userName } = useLoaderData() as UserData;
  return (
    <PageWrapper>
      <Title>{userName}, это ваши расходы</Title>
      <Table expenses={expenses} />
    </PageWrapper>
  );
};

export default ExpensePage;
