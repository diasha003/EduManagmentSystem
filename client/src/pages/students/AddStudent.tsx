import React from 'react';
import { Link } from 'react-router-dom';
import AddStudentForm from './components/studentAddition/AddStudentForm';

const AddStudent: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '65%', margin: '10px 0' }}>
                <Link to="/students" style={{ margin: '10px 0' }}>
                    Back to Students
                </Link>
            </div>
            <AddStudentForm />
        </div>
    );
};

export default AddStudent;
