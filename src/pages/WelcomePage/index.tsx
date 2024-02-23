import React from "react";
import styled from "styled-components";
import TypeWriter from "../../components/TypeWriter";
import WelcomeCard from "./src/WelcomeCard";
import LoginPage from "../LoginPage";
import { waait } from "../../helpers/helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  margin-top: 1rem;
  min-height: 100vh;
  width: 100vw;
  /* position: relative; */
  color: #ffffff;
  z-index: 100;
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  min-height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: #f95959;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Shadow properties */
`;

const Content = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Cards = styled.div`
  margin-right: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

  &:hover {
    color: #f95959;
    transition: 0.3s;
  }
`;

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRegistration = async (userName: string) => {
    await waait();
    try {
      localStorage.setItem("userName", JSON.stringify(userName)); // Сохранение имени пользователя
      navigate("/");
      return toast.success(`Welcome, ${userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  };

  return (
    <Section>
      <Container>
        <Title>BudgetTracker</Title>
        <TypeWriter />
        <Content>
          <Cards>
            <WelcomeCard
              text="Мы рады приветствовать вас в нашем уютном уголке финансового контроля и управления бюджетом. Здесь вы откроете для себя простой и эффективный способ учета своих финансов, а также получите возможность лучше управлять своим бюджетом. Часто мы сталкиваемся с вызовами финансового планирования и управления. Независимо от того, планируете ли вы отпуск, покупаете машину или просто стремитесь более осознанно тратить свои средства, наше приложение поможет вам в этом.

Прежде всего, давайте начнем с основ: учета ваших доходов и расходов. Наше приложение предоставляет интуитивно понятный интерфейс, который позволяет легко вводить и отслеживать ваши финансовые операции. Вы сможете следить за тем, сколько заработано и потрачено, а также анализировать свои траты для более эффективного планирования.

Наша цель - помочь вам достичь финансовой стабильности и уверенности в управлении своим бюджетом. Мы верим, что финансовое благополучие доступно каждому, и наше приложение создано для того, чтобы сделать этот процесс проще и приятнее.

Не стесняйтесь исследовать все возможности нашего приложения, задавать вопросы и делиться своими отзывами. Мы всегда готовы помочь вам достичь ваших финансовых целей."
            />
          </Cards>
          {/* <ButtonContainer>Начать сейчас &rarr;</ButtonContainer> */}
          <LoginPage onSubmit={handleRegistration} />
        </Content>
      </Container>
    </Section>
  );
};

export default WelcomePage;
