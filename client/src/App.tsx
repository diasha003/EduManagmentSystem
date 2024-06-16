import React from 'react';
import { Avatar, Layout } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';

import InfoStudents from './pages/students/InfoStudents';
import InfoEmployees from './pages/employees/InfoEmployess';
import AppCalendar from './pages/calendar/Calendar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NavBar from './components/NavBar/NavBar';
import CreateEmployeeForm from './pages/employees/components/createEmployeeForm/CreateEmployeeForm';
import NewCalendarEvent from './pages/calendar/NewCalendarEvent';

import './App.css';
import AddStudentForm from './pages/students/components/addStudentForm/AddStudentForm';
import FamiliesInvoicesInfo from './pages/families-invoices/FamiliesInvoicesInfo';
import { useAppSelector } from './hooks/redux';
import Home from './pages/home/Home';
import PersonDetails from './pages/personDetails/personDetails';
import Attendace from './pages/attendance/Attendace';

// const { Header } = Layout;
const { Header, Content } = Layout;

const App: React.FC = () => {
    const routes: {
        element: JSX.Element;
        name?: string;
        path: string;
        hideWrapper?: boolean;
    }[] = [];

    routes.push({ path: '/home', element: <Home></Home>, name: 'Home' });
    routes.push({ path: '/employees', element: <InfoEmployees />, name: 'Teachers & Staff' });
    routes.push({ path: '/employees/add/*', element: <CreateEmployeeForm />, name: 'Teachers & Staff' });
    routes.push({ path: '/students', element: <InfoStudents />, name: 'Students' });
    routes.push({ path: '/students/add', element: <AddStudentForm />, name: 'Students' });
    routes.push({ path: '/calendar', element: <AppCalendar />, name: 'Calendar' });
    routes.push({ path: '/new-event', element: <NewCalendarEvent selectedDate={new Date()} />, name: 'Calendar' });
    routes.push({ path: '/login', element: <Login />, hideWrapper: true });
    routes.push({ path: '/signup', element: <Register />, hideWrapper: true });
    routes.push({ path: '/families-invoices', element: <FamiliesInvoicesInfo />, name: 'Families & Invoices' });
    routes.push({ path: '/person', element: <PersonDetails />, name: '' });
    routes.push({ path: '/attendance/:eventId', element: <Attendace />, name: 'Attendace' });

    const user = useAppSelector((state) => state.auth.user);

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
                                        <div className="header">
                                            <div style={{ fontSize: '20px', fontWeight: '600' }}>{x.name}</div>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
                                                        {user?.firstName
                                                            .concat(' ')
                                                            .concat(user.lastName)
                                                            .split(' ')
                                                            .map((part) => part[0])
                                                            .join('')}
                                                    </Avatar>
                                                </div>
                                                <div style={{ marginLeft: '5px' }}>
                                                    <p style={{ fontWeight: 500, color: 'blue', cursor: 'pointer', margin: 0 }}>
                                                        {user?.firstName} {user?.lastName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
