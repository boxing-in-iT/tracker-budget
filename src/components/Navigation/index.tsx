import React from "react";
import styled from "styled-components";
import AccountImage from "../../assets/img/account.svg";
import { Form } from "react-router-dom";

const Header = styled.header`
  margin-top: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  padding: 1.5rem 2.5vw;
  margin: 0 auto;
  background-color: #233142;
  border-radius: 50px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h2`
  color: #f95959;
  margin-right: 2rem;
`;

const Menu = styled.ul`
  display: flex;
  gap: 2em;
`;

const MenuItem = styled.li`
  list-style: none;
  color: #e3e3e3;
  cursor: pointer;
  position: relative;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: #f95959;
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

const Account = styled.div`
  display: flex;
  align-items: center;
`;

const ImageAccount = styled.img`
  width: 2rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const UserName = styled.h3`
  color: #e3e3e3;
  margin-right: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #f95959;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d63737;
  }
`;

interface NavigationProps {
  userName: any;
}

const Navigation = (props: NavigationProps) => {
  const { userName } = props;
  return (
    <Header>
      <Container>
        <Left>
          <Logo>BudgetTracker</Logo>
          <Menu>
            <MenuItem>Main</MenuItem>
            <MenuItem>Expenses</MenuItem>
            <MenuItem>Info</MenuItem>
          </Menu>
        </Left>

        <Account>
          <ImageAccount src={AccountImage} />
          <UserName>{userName}</UserName>
          {userName && (
            <Form
              method="post"
              action="logout"
              onSubmit={(event) => {
                if (!window.confirm("Delete user and all data?")) {
                  event.preventDefault();
                }
              }}
            >
              <DeleteButton type="submit">Delete User</DeleteButton>
            </Form>
          )}
        </Account>
      </Container>
    </Header>
  );
};

export default Navigation;
