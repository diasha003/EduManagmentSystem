import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Dropdown, Avatar, Badge } from 'antd';
import { CaretDownOutlined, CloseCircleOutlined, DeleteOutlined, EyeOutlined, HomeOutlined, MailOutlined, MoreOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';

import studentAddOptions from './constants/studentAddOptions';
import { DataGrid, DataGridColumn } from '../../../components/DataGrid/DataGrid';
import { useAppSelector } from '../../../hooks/redux';
import { Group, Student, User } from 'shared/models';
import { useGetAllStudentsQuery } from '../../../features/api/extensions/studentApiExtension';
import stc from 'string-to-color';
import Search from 'antd/es/input/Search';
import { get, map } from 'lodash';

export interface StudentTableModel {
    key: number;
    email: string;
    address?: string;
    name: string;
    contact?: string;
    family?: string;
    note?: string;
    lastLesson?: Date;
    nextLesson?: Date;
    avgAttendance?: number;
    birthday?: string;
    age?: number;
    gender?: string;
    education?: string;
    lastLog?: Date;
    studentSince?: string;
    operation?: React.ReactElement;
    status: string;
    familyStudentsAsStudent?: { parent: User; parentId: number; studentId: number };
    groupStudents?: { group: Group }[];
    teacherStudentAsTeacher?: { teacher: User }[];
}

const StudentsTable: React.FC = () => {
    const nav = useNavigate();

    const user = useAppSelector((state) => state.auth.user);
    const data: Student[] | undefined = useGetAllStudentsQuery().currentData;

    console.log(data);

    const columns: DataGridColumn<StudentTableModel>[] = [
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
            width: 200,
            fixed: 'left',
            hidden: false,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
                                {record.name
                                    .split(' ')
                                    .map((part) => part[0])
                                    .join('')}
                            </Avatar>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                            <Link to={`/students/${record.key}`} style={{ fontWeight: 500, color: 'blue', marginBottom: 0, cursor: 'pointer' }}>
                                {record.name}
                            </Link>
                            <Space>
                                <Badge count={record.status.charAt(0).toUpperCase() + record.status.toLowerCase().slice(1)} color={stc(record.status.charAt(0).toUpperCase() + record.status.toLowerCase().slice(1) + ' light6')} />
                            </Space>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Student Contact',
            dataIndex: 'contact',
            key: 'contact',
            width: 200,
            hidden: true,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {record.email && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <MailOutlined style={{ marginRight: '5px' }} />
                                <>{record.email}</>
                            </div>
                        )}
                        {record.address && record.address.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <HomeOutlined style={{ marginRight: '5px' }} />
                                <>{record.address}</>
                            </div>
                        )}
                        {record.contact && record.contact.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <PhoneOutlined style={{ marginRight: '5px' }} />
                                <>{record.contact}</>
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            title: 'Family',
            dataIndex: 'family',
            key: 'family',
            width: 200,
            hidden: false,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {record.familyStudentsAsStudent?.parent.firstName} {record.familyStudentsAsStudent?.parent.lastName}
                        {record.familyStudentsAsStudent?.parent.email && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <MailOutlined style={{ marginRight: '5px' }} />
                                <>{record.email}</>
                            </div>
                        )}
                        {record.familyStudentsAsStudent?.parent.address && record.familyStudentsAsStudent?.parent.address.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <HomeOutlined style={{ marginRight: '5px' }} />
                                <>{record.address}</>
                            </div>
                        )}
                        {record.familyStudentsAsStudent?.parent.phoneNumber && record.familyStudentsAsStudent?.parent.phoneNumber.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <PhoneOutlined style={{ marginRight: '5px' }} />
                                <>{record.contact}</>
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            title: 'Notes',
            dataIndex: 'note',
            key: 'note',
            width: 150,
            hidden: true
        },
        {
            title: 'Groups',
            dataIndex: 'groups',
            key: 'groups',
            width: 80,
            hidden: false,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {record.groupStudents?.map((item) => {
                            return <span key={item.group.id}> {item.group.name.toString()}</span>;
                        })}
                    </div>
                );
            }
        },
        {
            title: 'Teachers',
            dataIndex: 'teachers',
            key: 'teachers',
            width: 120,
            hidden: false,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {record.teacherStudentAsTeacher?.map((item) => {
                            return (
                                <span key={item.teacher.id}>
                                    {item.teacher.firstName} {item.teacher.lastName}
                                </span>
                            );
                        })}
                    </div>
                );
            }
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
            hidden: true,
            render: (value) => {
                return (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',

                                    label: (
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                            <EyeOutlined />
                                            <p style={{ margin: '0 0 0 4px' }}>View</p>
                                        </div>
                                    )
                                },
                                {
                                    type: 'divider'
                                },
                                {
                                    key: '2',
                                    type: 'group',
                                    label: 'Set Status',
                                    children: [
                                        {
                                            key: '1-1',
                                            label: <Badge count="Active" color="#eafcd2" style={{ color: '#18790b' }} />
                                        },
                                        {
                                            key: '1-2',
                                            label: <Badge count="Trial" color="#005c5c" style={{ color: '#c9e4e4' }} />
                                        },
                                        {
                                            key: '1-3',
                                            label: <Badge count="InActive" color="#ebeeef" style={{ color: '#374145' }} />
                                        }
                                    ]
                                },
                                {
                                    type: 'divider'
                                },
                                {
                                    key: '3',

                                    label: (
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                            <DeleteOutlined />
                                            <p style={{ margin: '0 0 0 4px' }}>Delete</p>
                                        </div>
                                    )
                                }
                            ],
                            selectable: true,
                            onClick: (e) => {
                                if (e.key === '2') {
                                    //console.log(value.key)
                                }
                                //console.log(value);
                            }
                        }}
                    >
                        <Space>
                            <MoreOutlined style={{ fontSize: '20px' }} />
                        </Space>
                    </Dropdown>
                );
            }
        }
    ];

    const newData: StudentTableModel[] | undefined = data?.map((item, key) => {
        const birthdayDate = item.studentInfo?.birthdayDate ? new Date(item.studentInfo.birthdayDate) : undefined;
        const dateRegister = item.studentInfo?.dateRegister ? new Date(item.studentInfo.dateRegister) : undefined;
        return {
            key: item.id,
            name: `${item.firstName} ${item.lastName}`,
            contact: item.phoneNumber,
            email: item.email,
            address: item.address,
            note: item.studentInfo?.note,
            birthday: birthdayDate?.toDateString(),
            age: birthdayDate ? new Date().getFullYear() - birthdayDate.getFullYear() : undefined,
            gender: item.studentInfo?.gender,
            education: item.studentInfo?.institution,
            studentSince: dateRegister?.toDateString(),
            status: item.studentInfo?.status || '',
            familyStudentsAsStudent: item.familyStudentsAsStudent?.[0],
            groupStudents: item.groupStudents,
            teacherStudentAsTeacher: item.teacherStudentAsTeacher

            // lastLesson: Date;
            // nextLesson: Date;
            // avgAttendance: number;
            // lastLog: Date;
        };
    });

    let [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<StudentTableModel[]>([]);

    const onSearch = (e: any) => {
        setSearchText(e.target.value);
        const reg = new RegExp(e.target.value, 'gi');
        const filteredData = map(newData, (record) => {
            const studentField = get(record, 'student') as string | undefined;
            const studentMatch = studentField?.match(reg);

            const emailField = get(record, 'email') as string | undefined;
            const emailMatch = emailField?.match(reg);

            const familyField = get(record, 'family') as string | undefined;
            const familyMatch = familyField?.match(reg);

            const ageField = (get(record, 'age') ?? '').toString();
            const ageMatch = ageField.match(reg);

            if (!studentMatch && !emailMatch && !familyMatch && !ageMatch) {
                return null;
            }

            return record;
        }).filter((record): record is StudentTableModel => record !== null);

        setFilteredData(filteredData);
    };

    return (
        <DataGrid
            columns={columns}
            dataSource={newData ? (searchText ? filteredData : newData) : []}
            showColumnsSelector
            showSort
            toolbar={
                <>
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
                            Options
                        </Button>
                    </Space>
                    <Search size="middle" placeholder="Search Records" suffix={<CloseCircleOutlined onClick={() => setSearchText('')} />} onPressEnter={onSearch} onChange={onSearch} style={{ width: '50%' }} value={searchText} />
                </>
            }
        />
    );
};

export default StudentsTable;
