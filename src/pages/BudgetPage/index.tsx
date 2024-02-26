import React, { useState } from "react";
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
  waait,
} from "../../helpers/helper";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BudgetItem from "../../components/BudgetItem/budget-item";
import AddExpenseForm from "../Dashboard/src/add-expense-form";
import { toast } from "react-toastify";
import Table from "../../components/Table/table-component";
import Modal from "../../components/Modal/modal";

const GridLg = styled.div`
  display: grid;
  gap: 32px; //space-lg
  width: 100%;
`;

const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Title = styled.h1`
  color: #e3e3e3;
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

const DeleteButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  height: 3rem;
  border: none;
  color: #fff;
  background-color: #ff5722;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1.1rem;
  &:hover {
    background-color: #ff6f4a;
    transform: scale(1.05);
  }
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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const deleteBudget = () => {
    try {
      deleteItem({ key: "budgets", id: budget.id });
      setShowModal(false);
      navigate("/budgets");
    } catch (e) {
      throw new Error("Возникла проблема при удалении бюджета.");
    }
  };

  return (
    <GridLg>
      <FirstContainer>
        <Title>
          Бюджет <span>{budget.name}</span>
        </Title>
        <DeleteButton onClick={() => setShowModal(true)}>Удалить</DeleteButton>
      </FirstContainer>
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
      {confirmDelete && (
        <div>
          <p>Вы уверены, что хотите удалить бюджет?</p>
          <button onClick={() => setConfirmDelete(false)}>Отмена</button>
          <button onClick={deleteBudget}>Подтвердить</button>
        </div>
      )}
      {showModal && (
        <Modal onCancel={() => setShowModal(false)} onConfirm={deleteBudget} />
      )}
    </GridLg>
  );
};

export default BudgetPage;
