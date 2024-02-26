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
`;

const Budgets = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 2rem;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  height: 30px; /* Добавлено свойство height */
`;

export const budgetsLoader = async () => {
  const budgets = fetchData("budgets");
  return { budgets };
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
  const filteredBudgets = budgets.filter((budget) =>
    budget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <Budgets>
        {filteredBudgets.map((budget, id) => (
          <BudgetItem key={id} budget={budget} />
        ))}
      </Budgets>
    </PageWrapper>
  );
};

export default AllBudgetPage;
