import React, { useState } from "react";
import styled from "styled-components";
import { fetchData } from "../../helpers/helper";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "../../components/BudgetItem/budget-item";

const PageWrapper = styled.div`
  display: grid;
  gap: 32px;
  place-items: start;
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
  @media (max-width: 64em) {
    font-size: 1rem;
  }
`;

const Budgets = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 2rem;

  /* @media (max-width: 64em) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  } */
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  height: 30px; /* Добавлено свойство height */

  @media (max-width: 64em) {
    font-size: 8px;
    height: 15px;
  }
`;

export const budgetsLoader = async () => {
  const budgets = fetchData("budgets");
  return { budgets };
};

export const budgetAction = async ({ request }: any) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
};

interface Budget {
  amount: number;
  color: string;
  createdAt: number;
  id: string;
  name: string;
}

export type UserData = {
  budgets: Budget[];
};

const AllBudgetPage = () => {
  const { budgets } = useLoaderData() as UserData;
  const [searchTerm, setSearchTerm] = useState("");

  // Фильтрация бюджетов на основе введенного поискового запроса
  const filteredBudgets = budgets
    ? budgets.filter((budget) =>
        budget.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <PageWrapper>
      <FirstContainer>
        <Title>Все ваши бюджеты</Title>
        <SearchInput
          type="text"
          placeholder="Поиск бюджета"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FirstContainer>

      {filteredBudgets.length === 0 ? (
        <p>Вы не создали еще ни одного бюджета.</p>
      ) : (
        <Budgets>
          {filteredBudgets.map((budget, id) => (
            <BudgetItem key={id} budget={budget} />
          ))}
        </Budgets>
      )}
    </PageWrapper>
  );
};

export default AllBudgetPage;
