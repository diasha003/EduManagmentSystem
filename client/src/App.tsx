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
  const routes: {
    element: JSX.Element;
    path: string;
    hideWrapper?: boolean;
  }[] = [];

  routes.push({ path: "/home", element: <></> });
  routes.push({ path: "/employees", element: <InfoEmployees /> });
  routes.push({ path: "/students", element: <InfoStudents /> });
  routes.push({ path: "/students/add", element: <AddStudent /> });
  routes.push({ path: "/calendar", element: <CalendarTest /> });

  return (
    <Routes>
      {routes.map((x) => (
        <Route
          path={x.path}
          element={
            x.hideWrapper ? (
              x.element
            ) : (
              <>
                <Layout hasSider>
                  <NavBar></NavBar>
                  <Layout className="layout">
                    <Header className="header">Header</Header>
                    <Content className="content">{x.element}</Content>
                  </Layout>
                </Layout>
              </>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default App;
