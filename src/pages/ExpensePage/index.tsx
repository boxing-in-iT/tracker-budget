import React from "react";
import { fetchData } from "../../helpers/helper";
import Table from "../../components/Table/table-component";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const { expenses, userName } = useLoaderData() as UserData;
  return (
    <PageWrapper>
      {expenses && expenses.length > 0 ? (
        <>
          <Title>
            {userName}, {t("allExpenses")}
          </Title>
          <Table expenses={expenses} />
        </>
      ) : (
        <Title>{t("expensesNotCreated")}</Title>
      )}
    </PageWrapper>
  );
};

export default ExpensePage;
