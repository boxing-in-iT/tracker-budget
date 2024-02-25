import React from "react";
import { fetchData } from "../../helpers/helper";
import Table from "../../components/Table/table-component";
import { useLoaderData } from "react-router-dom";

export const expenseLoader = async () => {
  const expenses = fetchData("expenses");
  return { expenses };
};

interface Expenses {
  amount: number;
  budgetId: string;
  createdAt: number;
  id: string;
  name: string;
}

export type UserData = {
  expenses: Expenses[];
};

const ExpensePage = () => {
  const { expenses } = useLoaderData() as UserData;
  return (
    <>
      <Table expenses={expenses} />
    </>
  );
};

export default ExpensePage;
