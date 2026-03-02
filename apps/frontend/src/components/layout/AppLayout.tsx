import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Layout from "./Layout";

const AppLayout: React.FC = () => {
  return (
    <Layout className="flex">
      <Navbar />
      <main className="max-h-[100vh] flex-1">
        <Outlet />
      </main>
    </Layout>
  );
};

export default AppLayout;
