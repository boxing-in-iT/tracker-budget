import React from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useNavigate } from "react-router-dom";
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
  budgetId: string;
  // onConfirm: () => void;
}

const Modal = (props: ModalProps) => {
  const { t, i18n } = useTranslation();
  const { onCancel, budgetId } = props;
  const fetcher = useFetcher();

  const FormSt = styled(fetcher.Form)`
    /* display: flex;
    flex-direction: column; */
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: space-between;
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
      width: 100%;
    }

    /* button {
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
    } */
  `;

  return (
    <ModalContainer>
      <ModalContent>
        <p>{t("deleteBudget")}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <FormSt method="post">
            <DeleteButton onClick={onCancel}>{t("cancel")}</DeleteButton>
            <input type="hidden" name="_action" value="deleteBudget" />
            <input type="hidden" name="budgetId" value={budgetId} />

            <Button type="submit">{t("accept")}</Button>
          </FormSt>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
