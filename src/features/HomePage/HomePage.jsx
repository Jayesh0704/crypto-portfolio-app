import React from "react";
import Dashboard from "../dashboard/Dashboard";
import CoinsTable from "../../components/Coin/CoinsTable";
import Header from "../../components/Header/Header";


const Homepage = () => {
  return (
    <>


      <Header /> 
     
     
      <Dashboard />
      
      <CoinsTable />
    </>
  );
};

export default Homepage;