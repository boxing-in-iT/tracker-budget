import React from "react";
import styled from "styled-components";
import AccountImage from "../../assets/img/account.svg";

const Header = styled.header`
  background-color: #233142;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  margin: 0 auto;
  background-color: #233142;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h2`
  color: #e3e3e3;
`;

const Menu = styled.ul`
  margin-top: 1.25em;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Account = styled.div``;

const ImageAccount = styled.img`
  width: 2rem;
  cursor: pointer;
`;

const Navigation = () => {
  return (
    <Header>
      <Container>
        <Left>
          <Logo>Logo</Logo>
          <Menu>
            <MenuItem>Main</MenuItem>
            <MenuItem>Expenses</MenuItem>
            <MenuItem>Info</MenuItem>
          </Menu>
        </Left>

        <Account>
          <ImageAccount src={AccountImage} />
        </Account>
      </Container>
    </Header>
  );
};

export default Navigation;
