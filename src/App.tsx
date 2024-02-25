import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import styled from "styled-components";
import Footer from "./components/Footer";

import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Main, { mainLoader } from "./components/Main";
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import { logoutAction } from "./actions/logoutAction";
import WelcomePage from "./pages/WelcomePage";
import ExpensePage, { expenseLoader } from "./pages/ExpensePage";
import BudgetPage, { budgetLoader } from "./pages/BudgetPage";
// import { logoutAction } from "./actions/logoutAction";

const Page = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "/expenses",
        element: <ExpensePage />,
        loader: expenseLoader,
      },
      {
        path: "/budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
  {
    path: "/register",
    // element: <LoginPage isRegistering="Register" />,
    element: <WelcomePage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
