import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';

import InfoStudents from './pages/students/InfoStudents';
import AddStudent from './pages/students/AddStudent';
import InfoEmployees from './pages/employees/InfoEmployess';
import CalendarTest from './pages/calendar/Calendar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NavBar from './components/NavBar/NavBar';
import CreateEmployeeForm from './pages/employees/components/createEmployeeForm/CreateEmployeeForm';
import NewCalendarEvent from './pages/calendar/NewCalendarEvent';

import './App.css';

// const { Header } = Layout;
const { Header, Content } = Layout;

const App: React.FC = () => {
    const routes: {
        element: JSX.Element;
        path: string;
        hideWrapper?: boolean;
    }[] = [];

    routes.push({ path: '/home', element: <></> });
    routes.push({ path: '/employees', element: <InfoEmployees /> });
    routes.push({ path: '/employees/add/*', element: <CreateEmployeeForm /> });
    routes.push({ path: '/students', element: <InfoStudents /> });
    routes.push({ path: '/students/add', element: <AddStudent /> });
    routes.push({ path: '/calendar', element: <CalendarTest /> });
    routes.push({ path: '/new-event', element: <NewCalendarEvent selectedDate={new Date()} />})
    routes.push({ path: '/login', element: <Login />, hideWrapper: true });
    routes.push({ path: '/signup', element: <Register />, hideWrapper: true });

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
