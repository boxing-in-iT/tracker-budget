import React from "react";
import LoginPage from "../LoginPage";

const Dashboard = () => {
  let userName = "d"; // Ваше условие должно определять, залогинен пользователь или нет
  return (
    <div>
      {userName ? <div>Hello</div> : <LoginPage isRegistering="Register" />}
    </div>
  );
};

export default Dashboard;
