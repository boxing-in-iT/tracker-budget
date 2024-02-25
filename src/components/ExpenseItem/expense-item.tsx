import React from "react";
import {
  deleteItem,
  formateDateToLocalString,
  getAllMatchingItems,
} from "../../helpers/helper";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormSt = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 1.5rem;
    height: 2.5rem;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 0.5rem;
    font-size: 1.1rem;
  }

  button {
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
  }
`;

interface Expenses {
  amount: number;
  budgetId: string;
  createdAt: number;
  id: string;
  name: string;
}

interface ExpensesTableProps {
  expense: Expenses;
}

const ExpenseItem = (props: ExpensesTableProps) => {
  const { expense } = props;

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const handleSubmit = () => {
    try {
      deleteItem({ key: "expenses", id: expense.id });
      return toast.success(`Expense deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleteing your expense.");
    }
  };

  return (
    <>
      <td>{expense.name}</td>
      <td>{expense.amount}</td>
      <td>{formateDateToLocalString(expense.createdAt)}</td>
      {/* {showBudget ? (
        <td>
          <Link to={`/budget/${budget.id}`}>{budget.name}</Link>
        </td>
      ) : (
        <></>
      )} */}
      <td>{budget.name}</td>
      <td>
        {
          <FormSt onSubmit={handleSubmit}>
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <button
              type="submit"
              aria-aria-label={`Delete ${expense.name} expense`}
            >
              Delete
            </button>
          </FormSt>
        }
      </td>
    </>
  );
};

export default ExpenseItem;
