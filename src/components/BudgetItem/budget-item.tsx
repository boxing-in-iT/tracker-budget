import React, { useState } from "react";
import styled from "styled-components";
import {
  calculateSpentByBudget,
  deleteItem,
  formatCurrency,
  formatPercentage,
} from "../../helpers/helper";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/modal";

interface BudgetItemWrapperProps {
  accentColor?: string;
}

export const BudgetItemWrapper = styled.div<BudgetItemWrapperProps>`
  position: relative;
  display: grid;
  flex: 1 1 32.2%;
  max-width: 600px;
  background-color: rgb(242, 234, 244);
  border-radius: 25px;
  border: 3px solid hsl(${(props) => props.accentColor});
  text-decoration: none;
  color: hsl(${(props) => props.accentColor});
  padding: 24px;
  gap: 16px;

  &:hover > .delete-button {
    opacity: 1;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  color: black;
  background-color: #ff5f5f;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease; /* Добавленный transition для плавного появления */

  &:hover {
    background-color: #ff3333;
  }
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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { budget } = props;
  const { id, name, amount, color } = budget;

  const handleConfirmDelete = () => {
    try {
      deleteItem({ key: "budgets", id: budget.id });
      setShowModal(false);
    } catch (e) {
      throw new Error("Возникла проблема при удалении бюджета.");
    }
  };

  const deleteBudget = () => {
    try {
      setShowModal(true);
    } catch (e) {
      throw new Error("Возникла проблема при удалении бюджета.");
    }
  };

  const spent = calculateSpentByBudget(id);
  return (
    <>
      {showModal && (
        <Modal
          onCancel={() => setShowModal(false)}
          budgetId={budget.id}
          // onConfirm={handleConfirmDelete}
        />
      )}
      <StyledLink to={`/budget/${budget.id}`}>
        <BudgetItemWrapper accentColor={color}>
          {/* <DeleteButton className="delete-button" onClick={deleteBudget}>
          X
        </DeleteButton> */}
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
    </>
  );
};

export default BudgetItem;
