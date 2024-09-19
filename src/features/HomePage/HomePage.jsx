import React from "react";
import Dashboard from "../dashboard/Dashboard";
import CoinsTable from "../../components/Coin/CoinsTable";

const Homepage = () => {
  return (
    <>
      <Dashboard />
      
      <CoinsTable />
    </>
  );
};

export default Homepage;