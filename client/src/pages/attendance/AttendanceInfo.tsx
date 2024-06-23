import React, { useEffect, useState } from 'react';

import { Dropdown, Flex, Form, Input, MenuProps, Progress, Space, Tag } from 'antd';
import { DataGrid, DataGridColumn } from '../../components/DataGrid/DataGrid';
import './AttendanceInfo.style.css';
import { CaretDownOutlined } from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useGetStudentEventsQuery } from '../../features/api/extensions/paymentApiExtension';
import { useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

//import _ from 'lodash';

const Search = Input.Search;

export interface StudentEventTableModel {
    key: number;
    status: string;
    event: {
        date: Date;
        duration: number;
        teacher: {
            firstName: string;
            lastName: string;
        };
    };
}

const AttendanceInfo: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>('entire history');

    const user = useAppSelector((state) => state.auth.user);
    const { studentId } = useParams();

    const columns: DataGridColumn<StudentEventTableModel>[] = [
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            width: 150,
            fixed: 'left',
            hidden: false,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p>Lesson</p>
                            <Tag color={record.status === 'Present' ? 'green' : 'red'} style={{width: "100px"}}>{record.status}</Tag>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Date & Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: 150,
            fixed: 'left',
            hidden: false,
            render: (value, record) => {
                return (
                    <div>
                        <p>{record.event.date.toDateString()}</p>
                    </div>
                );
            }
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            width: 150,
            hidden: false,
            render: (value, record) => {
                return (
                    <div>
                        <p>
                            {record.event.teacher.firstName} {record.event.teacher.lastName}
                        </p>
                    </div>
                );
            }
        },

        {
            title: 'Duration',
            dataIndex: 'dayOfWeek',
            key: 'dayOfWeek',
            fixed: 'right',
            width: 100,
            hidden: false,
            render: (value, record) => {
                return <div>{record.event.duration}</div>;
            }
        }
    ];

    const testItems: MenuProps['items'] | undefined = [
        { key: 1, label: 'last 3 months' },
        { key: 2, label: 'last 6 months' },
        { key: 3, label: 'last year' },
        { key: 4, label: 'entire history' }
    ];

    const data = useGetStudentEventsQuery(Number(studentId)).currentData;

    console.log(data);

    const newData: StudentEventTableModel[] | undefined = data?.map((item) => {
        return {
            key: item.id,
            status: item.status,
            event: {
                date: new Date(item.event.date),
                duration: item.event.duration,
                teacher: {
                    firstName: item.event.teacher.firstName,
                    lastName: item.event.teacher.lastName
                }
            }
        };
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    margin: '15px 15px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }}
                >
                    <h3>Attendance from the</h3>
                    <Dropdown
                        menu={{
                            items: testItems,
                            onClick: (e) => {
                                const currentPeriod: MenuItemType | undefined = testItems?.filter((item): item is MenuItemType => item !== null).find((item) => item.key === Number(e.key));
                                setSelectedPeriod(currentPeriod?.label?.toString());
                            }
                        }}
                        trigger={['click']}
                    >
                        <Space style={{ marginLeft: '10px', fontSize: '18px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '100', color: 'blue' }}>{selectedPeriod}</h3>
                            <CaretDownOutlined />
                        </Space>
                    </Dropdown>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <h3>Average Attendance</h3>
                    <div style={{ background: 'white', margin: '15px 0px', padding: '10px 10px', border: '1px solid #0000002d', borderRadius: '2px', boxShadow: '0 2px 4px #6f41c51a,0 0 1px #6f41c50d !important' }}>
                        <table className="tableAverageAttendance">
                            <tbody>
                                <tr>
                                    <td rowSpan={2} style={{ borderLeft: 'none' }}>
                                        <Flex gap="small">
                                            <Progress type="dashboard" percent={75} size="small" />
                                        </Flex>
                                    </td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td style={{ borderRight: 'none' }}>4</td>
                                </tr>
                                <tr>
                                    <td>Present</td>
                                    <td>Student Absences</td>
                                    <td style={{ borderRight: 'none' }}>Total Events</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DataGrid columns={columns} dataSource={newData ? newData : []} showSort showColumnsSelector toolbar={<div></div>} />
        </div>
    );
};

export default AttendanceInfo;
