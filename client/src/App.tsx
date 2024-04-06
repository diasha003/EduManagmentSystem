import React from "react";
import "./App.css";
import { Footer } from "antd/es/layout/layout";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import InfoStudents from "./pages/students/InfoStudents";

import AddStudent from "./pages/students/AddStudent";
import InfoEmployees from "./pages/employees/InfoEmloyess";
import CalendarTest from "./pages/calendar/Calendar";
import { Layout } from "antd";

// const { Header } = Layout;
const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout hasSider>
      <NavBar></NavBar>

      <Layout className="layout">
        <Header className="header">Header</Header>
        <Content className="content">
          <Routes>
            <Route element={<InfoEmployees />} path="/employees"></Route>
          </Routes>
          <Routes>
            <Route element={<InfoStudents />} path="/students"></Route>
          </Routes>
          <Routes>
            <Route element={<AddStudent />} path="/students/add"></Route>
          </Routes>
          <Routes>
            <Route element={<CalendarTest />} path="/calendar"></Route>
          </Routes>
        </Content>
        {/* <Footer className="footer">Footer</Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;
