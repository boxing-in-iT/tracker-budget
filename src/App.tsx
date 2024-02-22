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
import Dashboard from "./pages/Dashboard";


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
      },
    ],
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
