import React from "react";
import styled from "styled-components";
import ExpenseItem from "../ExpenseItem/expense-item";

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

interface Expenses {
  amount: number;
  budgetId: string;
  createdAt: number;
  id: string;
  name: string;
}

interface ExpensesTableProps {
  expenses: Expenses[];
}

const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(2n) {
    background-color: #f9f9f9;
  }
`;

const Table = (props: ExpensesTableProps) => {
  const { expenses } = props;

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {["Name", "Amount", "Date", "Budget", ""].map((i, index) => (
              <TableHeaderCell key={index}>{i}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <ExpenseItem expense={expense} />
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
