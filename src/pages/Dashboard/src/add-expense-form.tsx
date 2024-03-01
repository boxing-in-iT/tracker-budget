import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "react-router-dom";
import styled from "styled-components";

export const formStyles = `
select {
    width: 100%;
    font: inherit;
    font-size: 0.94rem;
    background-color: rgb(242, 234, 244); //bkg
    border: 2px solid rgb(173, 160, 179); //muted
    border-radius: 4px; //roundedSm
    padding: 10px 18px; //spaceXs spaceSm
    height: 100%;

    :is(input, select):focus {
      outline: none;
      border-color:rgb(193, 41, 59);
      box-shadow: 0 0 0 1px rgb(193, 41, 59);
    }
`;

const Box = styled.div`
  flex: 1 1 48%;
  background-color: #233142;
  padding: 2rem;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 64em) {
    width: 16rem;
  }
`;

const Title = styled.h1`
  color: #e3e3e3;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

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
    margin-top: 2rem;
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

  @media (min-width: 768px) {
    ${formStyles}
  }
`;

export const ExpenseInput = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 64em) {
    flex-direction: column;

    gap: 0;
  }
`;

export const GridXs = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
`;

const Label = styled.label`
  color: #e3e3e3;
  font-size: 1.2rem;
`;

interface Budget {
  amount: number;
  color: string;
  createdAt: number;
  id: string;
  name: string;
}

interface ExpenseProps {
  budgets: Budget[];
}

const AddExpenseForm = (props: ExpenseProps) => {
  const { t, i18n } = useTranslation();
  const { budgets } = props;

  const fetcher = useFetcher();
  const isSubmittimg = fetcher.state === "submitting";

  const FormSt = styled(fetcher.Form)`
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
      margin-top: 2rem;
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

    @media (min-width: 768px) {
      ${formStyles}
    }
  `;

  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmittimg) {
      //clear form
      formRef.current?.reset();

      //reset focus
      focusRef.current?.focus();
    }
  }, [isSubmittimg]);

  return (
    <Box>
      <Title>{t("addExpenses")}</Title>
      <FormSt method="post" className="grid-sm" ref={formRef}>
        <ExpenseInput>
          <GridXs>
            <Label>{t("targetExpense")}</Label>
            <input
              type="text"
              name="newExpense"
              placeholder={t("example")}
              ref={focusRef}
              required
            />
          </GridXs>
          <GridXs>
            <Label htmlFor="newExpenseAmount">{t("amount")}</Label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenceAmount"
              placeholder={t("eg")}
              required
            />
          </GridXs>
        </ExpenseInput>

        <GridXs className="grid-xs">
          <Label htmlFor="newExpenseBudget">{t("budgetCategory")}</Label>
          <select name="newExpenseBudget" id="newExpenceBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </GridXs>
        <input type="hidden" name="_action" value="createExpense" />

        <button type="submit" disabled={isSubmittimg}>
          {isSubmittimg ? (
            <span>{t("addingExpense")}</span>
          ) : (
            <span>{t("addExpenses")}</span>
          )}
        </button>
      </FormSt>
    </Box>
  );
};

export default AddExpenseForm;
