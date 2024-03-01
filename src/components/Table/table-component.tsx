import React from "react";
import styled from "styled-components";
import ExpenseItem from "../ExpenseItem/expense-item";
import { useTranslation } from "react-i18next";

const TableContainer = styled.div`
  margin: 20px;
  @media (max-width: 64em) {
    margin: 0;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 64em) {
    font-size: 14px; /* уменьшаем размер шрифта */
  }

  @media (max-width: 40em) {
    font-size: 12px; /* еще больше уменьшаем на маленьких экранах */
  }
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;

  @media (max-width: 40em) {
    padding: 5px; /* уменьшаем отступы на маленьких экранах */
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
  expenses: Expenses[];
}

const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(2n) {
    background-color: #f9f9f9;
  }
`;

const Table = (props: ExpensesTableProps) => {
  const { t } = useTranslation();
  const { expenses } = props;

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {[
              `${t("name")}`,
              `${t("amount")}`,
              `${t("date")}`,
              `${t("budget")}`,
              "",
            ].map((i, index) => (
              <TableHeaderCell key={index}>{i}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, i) => (
            <TableRow key={expense.id}>
              <ExpenseItem expense={expense} index={i} />
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
