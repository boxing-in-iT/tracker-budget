import React from "react";
import {
  createExpense,
  getAllMatchingItems,
  waait,
} from "../../helpers/helper";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import BudgetItem from "../../components/BudgetItem/budget-item";
import AddExpenseForm from "../Dashboard/src/add-expense-form";
import { toast } from "react-toastify";
import Table from "../../components/Table/table-component";

const GridLg = styled.div`
  display: grid;
  gap: 32px; //space-lg
  width: 100%;
`;

const FlexLg = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 32px;
`;

const GridMd = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
`;

export const budgetLoader = async ({ params }: { params: any }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }
  console.log(budget);
  return { budget, expenses };
};

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
  budget: Budget;
  expenses: Expenses[];
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData() as UserData;

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

  return (
    <GridLg>
      <h1>
        <span>{budget.name}</span> Overview
      </h1>
      <FlexLg>
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} creatingExpense={creatingExpense} />
      </FlexLg>
      {expenses && expenses.length > 0 && (
        <GridMd>
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} />
        </GridMd>
      )}
    </GridLg>
  );
};

export default BudgetPage;
