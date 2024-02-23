import React, { useEffect } from "react";
import LoginPage from "../LoginPage";
import { fetchData } from "../../helpers/helper";
import { Navigate, redirect, useLoaderData } from "react-router-dom";

export function dashboardLoader() {
  const userName = fetchData("userName");
  return userName;
}

const Dashboard = () => {
  const userName = useLoaderData();
  console.log("UserName: ", userName);

  if (!userName) {
    // Выполните редирект, обернув его в условие внутри useEffect
    return <Navigate to={"/register"} />;
  }

  return userName ? <div>Hello</div> : null;
};

export default Dashboard;
