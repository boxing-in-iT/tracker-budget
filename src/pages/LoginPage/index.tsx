import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 8%;
`;

const Box = styled.div`
  width: 300px;
  border-radius: 15px;
  padding: 2rem;
  background-color: #2d4059;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormSt = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 1.25rem;
    height: 2rem;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    height: 2.5rem;
    border: none;
    color: #fff;
    background-color: #ff5722;
    transition: background-color 0.3s, transform 0.2s;
    &:hover {
      background-color: #ff6f4a;
      transform: scale(1.05);
    }
  }
`;

interface LoginProps {
  onSubmit: (username: string) => void;
}

const LoginPage = (props: LoginProps) => {
  const [userName, setUserName] = useState(""); // State for the username

  const { onSubmit } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pass the username to the parent component
    onSubmit(userName);
  };

  return (
    <Container>
      <Box>
        <Title>Register</Title>
        <FormSt onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit">Register</button>
        </FormSt>
      </Box>
    </Container>
  );
};

export default LoginPage;
