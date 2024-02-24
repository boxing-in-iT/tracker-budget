import React from "react";
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

  ${formStyles}
`;

export const ExpenseInput = styled.div`
  display: flex;
  gap: 24px;
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

const AddExpenseForm = () => {
  return (
    <Box>
      <Title>Добавить расходы</Title>
      <FormSt>
        <ExpenseInput>
          <GridXs>
            <Label>На что потратили</Label>
            <input type="text" placeholder="Введите название" />
          </GridXs>
          <GridXs>
            <Label htmlFor="newBudgetAmount">Сумма</Label>
            <input
              type="number"
              step="0.01"
              name="newBudgetAmount"
              id="newBudgetAmount"
              placeholder="например, $350"
              required
              inputMode="decimal"
            />
          </GridXs>
        </ExpenseInput>

        <GridXs className="grid-xs">
          <Label htmlFor="newExpenseBudget">Budget Category</Label>
          <select name="newExpenseBudget" id="newExpenceBudget" required>
            <option>1</option>
            <option>2</option>
            <option>3</option>

            {/* {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })} */}
          </select>
        </GridXs>
        <button type="submit">Добавить</button>
      </FormSt>
    </Box>
  );
};

export default AddExpenseForm;
