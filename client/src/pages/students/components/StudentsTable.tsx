import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Dropdown } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';

import studentAddOptions from './constants/studentAddOptions';
import { DataGrid, DataGridColumn } from '../../../components/DataGrid/DataGrid';

export interface StudentModel {
    key: string;
    student: string;
    contact: string;
    family: string;
    notes: string;
    groups: string;
    teachers: string[];
    lastLesson: Date;
    nextLesson: Date;
    avgAttendance: number;
    birthday: Date;
    age: number;
    gender: string;
    education: string;
    lastLog: Date;
    studentSince: Date;
    operation: React.ReactElement;
}

const columns: DataGridColumn<StudentModel>[] = [
    {
        title: 'Student',
        dataIndex: 'student',
        key: 'student',
        width: 200,
        fixed: 'left',
        hidden: false
    },
    {
        title: 'Student Contact',
        dataIndex: 'contact',
        key: 'contact',
        width: 200,
        hidden: true
    },
    {
        title: 'Family',
        dataIndex: 'family',
        key: 'family',
        width: 150,
        hidden: false
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        width: 150,
        hidden: false
    },
    {
        title: 'Groups',
        dataIndex: 'groups',
        key: 'groups',
        width: 150,
        hidden: false
    },
    {
        title: 'Teachers',
        dataIndex: 'teachers',
        key: 'teachers',
        width: 150,
        hidden: false
    },
    {
        title: 'Last Lesson',
        dataIndex: 'lastLesson',
        key: 'lastLesson',
        width: 150,
        hidden: true
    },
    {
        title: 'Next Lesson',
        dataIndex: 'nextLesson',
        key: 'nextLesson',
        width: 150,
        hidden: false
    },
    {
        title: 'Attendance Average',
        dataIndex: 'avgAttendance',
        key: 'avgAttendance',
        width: 150,
        hidden: true
    },
    {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
        width: 150,
        hidden: true
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        hidden: false
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 150,
        hidden: true
    },
    {
        title: 'School/University',
        dataIndex: 'education',
        key: 'education',
        width: 150,
        hidden: true
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLog',
        key: 'lastLog',
        width: 150,
        hidden: true
    },
    {
        title: 'Student Since',
        dataIndex: 'studentSince',
        key: 'studentSince',
        width: 150,
        hidden: true
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        hidden: true
        //render: () => <a>action</a>,
    }
];

const StudentsTable: React.FC = () => {
    const nav = useNavigate();

    return (
        <DataGrid
            columns={columns}
            dataSource={[]}
            showColumnsSelector
            showSort
            toolbar={
                <Space>
                    <Dropdown menu={{ items: studentAddOptions }} trigger={['click']}>
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            className="button"
                            onClick={() => {
                                nav('/students/add');
                            }}
                        >
                            <Space>
                                Add new
                                <CaretDownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>

                    <Button type="primary" className="button">
                        Messaging
                    </Button>
                    <Button type="primary" className="button">
                        Options
                    </Button>
                </Space>
            }
        />
    );
};

export default StudentsTable;
