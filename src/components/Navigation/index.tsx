import React, { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import AccountImage from "../../assets/img/account.svg";
import { Form, Link } from "react-router-dom";

import UA from "../../assets/img/ua.svg";
import USA from "../../assets/img/usa.svg";
import DropdownLanguage from "./src/dropdown-language";
import { useTranslation } from "react-i18next";

const Header = styled.header`
  margin-top: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  padding: 0.5rem 2.5vw;
  margin: 0 auto;
  background-color: #233142;
  border-radius: 50px;

  .mobile {
    display: none;
  }

  @media (max-width: 64em) {
    gap: 1rem;
    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
    }
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h2`
  color: #f95959;
  margin-right: 2rem;
  @media (max-width: 64em) {
    font-size: 0.75rem;
  }
`;

interface MenuProps {
  click?: boolean;
  menuBackground: string; // предполагаемый тип для menuBackground
}

const Menu = styled.ul<MenuProps>`
  display: flex;
  gap: 2em;

  @media (max-width: 64em) {
    /* 1024px */
    position: fixed;
    top: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    z-index: 10000;
    background-color: ${(props) => props.menuBackground};
    backdrop-filter: blur(2px);

    transform: ${(props) =>
      props.click ? "translateY(0)" : "translateY(1000%)"};
    transition: all 0.3s ease;

    flex-direction: column;
    justify-content: center;
  }
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

  @media (max-width: 64em) {
    gap: 2rem;
  }
`;

const ImageAccount = styled.img`
  width: 2rem;
  margin-right: 1rem;
  cursor: pointer;
  @media (max-width: 64em) {
    display: none; /* Скрыть контейнер при ширине экрана до 64em */
  }
`;

const UserName = styled.h3`
  color: #e3e3e3;
  margin-right: 1rem;
  @media (max-width: 64em) {
    display: none; /* Скрыть контейнер при ширине экрана до 64em */
  }
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

  @media (max-width: 64em) {
    width: 4rem;
    font-size: 0.5rem;
  }
`;

const LanguageSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 10%;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LanguageIcon = styled.img`
  width: 2rem;
  margin-right: 0.5rem; /* Добавлен отступ между иконкой и текстом */
`;

const LanguageName = styled.h4`
  margin-right: 1rem; /* Добавлен отступ между текстом и следующим элементом */
`;

interface HamburgerMenuProps extends HTMLAttributes<HTMLSpanElement> {
  click?: boolean;
}

const HamburgerMenu = styled.span<HamburgerMenuProps>`
  width: ${(props) => (props.click ? "2rem" : "1.5rem")};
  height: 2px;
  background: #ffffff;

  top: 2rem;
  left: 50%;
  transform: ${(props) =>
    props.click
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(0)"};

  display: flex;

  cursor: pointer;
  transition: all 0.3s ease;

  &::after,
  &::before {
    content: " ";
    width: ${(props) => (props.click ? "1rem" : "1.5rem")};
    height: 2px;
    right: ${(props) => (props.click ? "-2px" : "0")};
    background: #ffffff;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::after {
    top: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(-40deg)" : "rotate(0)")};
  }

  &::before {
    bottom: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(40deg)" : "rotate(0)")};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

interface NavigationProps {
  userName: any;
}

const Navigation = (props: NavigationProps) => {
  const { t, i18n } = useTranslation();
  const [click, setClick] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuBackground, setMenuBackground] = useState("transparent");
  const { userName } = props;

  const handleClickMenuItem = () => {
    setClick(false); // Закрыть меню при клике на пункт меню
    setMenuBackground("transparent"); // Изменено
  };

  const handleLangChange = (evt: string) => {
    console.log(evt);
    i18n.changeLanguage(evt);
  };

  return (
    <Header>
      <Container>
        <Left>
          <StyledLink to={"/"}>
            <Logo>BudgetTracker</Logo>
          </StyledLink>
          <Menu click={click} menuBackground={menuBackground}>
            <StyledLink to={"/"}>
              <MenuItem onClick={handleClickMenuItem}>{t("main")}</MenuItem>
            </StyledLink>
            <StyledLink to={"/budgets"}>
              <MenuItem onClick={handleClickMenuItem}>{t("budgets")}</MenuItem>
            </StyledLink>
            <StyledLink to={"/expenses"}>
              <MenuItem onClick={handleClickMenuItem}>{t("expenses")}</MenuItem>
            </StyledLink>
          </Menu>
        </Left>

        {/* Change to drppdown */}
        <LanguageSwitch>
          <Language onClick={() => handleLangChange("ua")}>
            <LanguageIcon src={UA} />
            <LanguageName>UA</LanguageName>
          </Language>
          <Language onClick={() => handleLangChange("en")}>
            <LanguageIcon src={USA} />
            <LanguageName>USA</LanguageName>
          </Language>
        </LanguageSwitch>
        {/* <DropdownLanguage /> */}

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
              <DeleteButton type="submit">{t("deleteUser")}</DeleteButton>
            </Form>
          )}
          <HamburgerMenu
            className="mobile"
            click={click}
            onClick={() => {
              setClick(!click);
              setMenuBackground(click ? "transparent" : "#233142"); // Изменено
            }}
          >
            &nbsp;
          </HamburgerMenu>
        </Account>
      </Container>
    </Header>
  );
};

export default Navigation;
