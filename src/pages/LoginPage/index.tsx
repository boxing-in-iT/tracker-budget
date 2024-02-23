import { wait } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { waait } from "../../helpers/helper";
import { Form, redirect, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

const FormSt = styled(Form)`
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

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const RememberMeLabel = styled.label`
  color: #fff;
  margin-right: 0.5rem;
`;

const ForgotPassword = styled.span`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  align-self: center;
  margin-top: 5rem;
`;

interface LoginPageProps {
  isRegistering: string;
}

const LoginPage = (props: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userName, setUserName] = useState(""); // Добавлено состояние для имени пользователя
  const navigate = useNavigate();

  const { isRegistering } = props;

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleForgotPassword = () => {
    // Redirect to forgot password page
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic
    if (isRegistering) {
      if (password === confirmPassword) {
        // Пароли совпадают, можно обрабатывать регистрацию
        setPasswordsMatch(true);
        registration(); // Вызываем функцию для регистрации пользователя
      } else {
        // Пароли не совпадают
        setPasswordsMatch(false);
      }
    } else {
      // Обработка логина
    }
  };

  const registration = async () => {
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
    <Container>
      <Box>
        <Title>{isRegistering ? "Register" : "Login"}</Title>
        <FormSt onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />{" "}
              {/* Добавляем поле для ввода имени пользователя */}
              {/* Это добавить позже пока что просто имя */}
              {/* <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordsMatch && (
                <span style={{ color: "red" }}>Passwords do not match</span>
              )} */}
            </>
          )}
          {!isRegistering && (
            <>
              <input type="text" placeholder="Username" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
            </>
          )}
          {/* {!isRegistering ? (
            <RememberMeContainer>
              <RememberMeLabel>Remember me</RememberMeLabel>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            </RememberMeContainer>
          ) : null} */}

          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        </FormSt>
        {/* {!isRegistering && (
          <ForgotPassword onClick={handleForgotPassword}>
            Forgot password?
          </ForgotPassword>
        )} */}
      </Box>
    </Container>
  );
};

export default LoginPage;
