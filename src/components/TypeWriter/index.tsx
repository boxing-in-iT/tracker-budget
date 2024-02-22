import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  color: #e3e3e3; /* Darker color for better readability */
  margin-bottom: 20px; /* Add spacing between the typewriter and other content */
`;

const TypewriterContainer = styled.div`
  display: inline-block;
  .Typewriter__wrapper {
    display: inline-block;
  }
`;

const TypeWriter = () => {
  return (
    <TypewriterContainer>
      <Title>
        <Typewriter
          options={{
            strings: [
              "Добро пожаловать в BudgetTracker!",
              "Управляйте своими финансами - управляйте своей жизнью.",
              "Добро пожаловать в BudgetTracker!",
              "Каждая копейка имеет значение. Давайте начнем сегодня!",
              "Добро пожаловать в BudgetTracker!",
              "Финансовая независимость - это путь. Давайте идти вместе.",
              "Добро пожаловать в BudgetTracker!",
              "Ваши деньги, ваши правила. Давайте сделаем их работу на вас.",
              "Добро пожаловать в BudgetTracker!",
              "Путь к финансовой свободе начинается с первого шага. Давайте сделаем его сейчас!",
            ],
            autoStart: true,
            loop: true,
            delay: 10,
            deleteSpeed: 10,
          }}
        />
      </Title>
    </TypewriterContainer>
  );
};

export default TypeWriter;
