import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  text-align: center;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  height: 3rem;
  border: none;
  color: #ffffff;
  background-color: #ff5722;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1.1rem;
  margin-top: 15px;
  width: 45%;
  &:hover {
    background-color: #ff6f4a;
    transform: scale(1.05);
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ddd;
  color: #555;
  &:hover {
    background-color: #ccc;
  }
`;

interface ModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = (props: ModalProps) => {
  const { onCancel, onConfirm } = props;
  return (
    <ModalContainer>
      <ModalContent>
        <p>Вы уверены, что хотите удалить бюджет?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <DeleteButton onClick={onCancel}>Отмена</DeleteButton>
          <Button onClick={onConfirm}>Подтвердить</Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
