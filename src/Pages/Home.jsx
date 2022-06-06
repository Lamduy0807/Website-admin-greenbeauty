import React from "react";
import { Route } from "react-router-dom";
import SideBar from "../Components/sideBar/SideBar"
import TopNav from "../Components/topnav/TopNav"
import Routes from "../Routes/Route";
const Home = () => {
  return (
    <Route
    render={(props) => (
      <div className="layout">
        <SideBar {...props} />
        <div className="layout_content">
          <TopNav />
          <div className="layout_content-main">
            <Routes />
          </div>
        </div>
      </div>
    )}
  />
  );
};

export default Home;
