import React from "react";
import styled from "styled-components";

const Box = styled.div`
  flex: 1 1 48%;
  background-color: #233142;
  padding: 2rem;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const Title = styled.h1`
  color: #e3e3e3;
  margin-bottom: 2rem;
  font-size: 2rem;
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

const AddBudgetForm = () => {
  return (
    <Box>
      <Title>Создать бюджет</Title>
      <FormSt>
        <GridXs>
          <Label>Название бюджета</Label>
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
        <button type="submit">Зарегистрировать</button>
      </FormSt>
    </Box>
  );
};

export default AddBudgetForm;
