import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-width: 300px;
  max-width: 80vw;
  /* margin: 20px; */
`;

const Card = styled.div`
  color: #333333;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

interface WelcomeCardProps {
  text: string;
}

const WelcomeCard = (props: WelcomeCardProps) => {
  const { text } = props;
  return (
    <CardWrapper>
      <Card>
        {/* <Title>Welcome to Beauty Card</Title> */}
        <Description>{text}</Description>
      </Card>
    </CardWrapper>
  );
};

export default WelcomeCard;
