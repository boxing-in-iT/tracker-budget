import React from "react";
import styled from "styled-components";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../../helpers/helper";
import { Link } from "react-router-dom";

interface BudgetItemWrapperProps {
  accentColor?: string;
}

export const BudgetItemWrapper = styled.div<BudgetItemWrapperProps>`
  display: grid;
  flex: 1 1 32.2%;
  max-width: 600px;
  background-color: rgb(242, 234, 244);
  border-radius: 25px;
  border: 3px solid hsl(${(props) => props.accentColor}); /* использование props */
  text-decoration: none;
  color: hsl(${(props) => props.accentColor}); /* использование props */
  padding: 24px;
  gap: 16px;
`;

export const ProgressText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

export const Progress = styled.progress`
  appearance: none;
  border: none;
  width: 100%;
  height: 16px;
  border-radius: 100vmax;
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 30%;
  /* list-style: none;
  color: #e3e3e3;
  cursor: pointer;
  position: relative; */
`;

interface Budget {
  amount: number;
  color: string;
  createdAt: number;
  id: string;
  name: string;
}

interface BudgetItemProps {
  budget: Budget;
}

const BudgetItem = (props: BudgetItemProps) => {
  const { budget } = props;
  const { id, name, amount, color } = budget;

  const spent = calculateSpentByBudget(id);
  return (
    <StyledLink to={`/budget/${budget.id}`}>
      <BudgetItemWrapper accentColor={color}>
        <ProgressText>
          <h3>{name}</h3>
          <p>{amount} Budget</p>
        </ProgressText>
        <Progress max={amount} value={spent}>
          {formatPercentage(spent / amount)}
        </Progress>
        <ProgressText>
          <small>{formatCurrency(spent)} spent</small>
          <small>{formatCurrency(amount - spent)} remaining</small>
        </ProgressText>
      </BudgetItemWrapper>
    </StyledLink>
  );
};

export default BudgetItem;
