import React, { useEffect, useState } from 'react';

import { Dropdown, Flex, Form, Input, MenuProps, Progress, Space } from 'antd';
import { DataGrid, DataGridColumn } from '../../components/DataGrid/DataGrid';
import './AttendanceInfo.style.css';
import { CaretDownOutlined } from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

//import _ from 'lodash';

const Search = Input.Search;

export interface GroupsTableModel {
    key: number;
    name: string;
    numberStudents: number;
    studentsName?: string;
    operation?: React.ReactElement;
    studentsId?: number[];
}

const AttendanceInfo: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>('entire history');

    const columns: DataGridColumn<GroupsTableModel>[] = [
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            width: 150,
            fixed: 'left',
            hidden: false
        },
        {
            title: 'Date & Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: 150,
            fixed: 'left',
            hidden: false
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            width: 150,
            hidden: false
        },
        {
            title: 'Day of Week',
            dataIndex: 'dayOfWeek',
            key: 'dayOfWeek',
            fixed: 'right',
            width: 100,
            hidden: false
        },
        {
            title: 'Duration',
            dataIndex: 'dayOfWeek',
            key: 'dayOfWeek',
            fixed: 'right',
            width: 100,
            hidden: false
        }
    ];

    const testItems: MenuProps['items'] | undefined = [
        { key: 1, label: 'last 3 months' },
        { key: 2, label: 'last 6 months' },
        { key: 3, label: 'last year' },
        { key: 4, label: 'entire history' }
    ];

    // const newData: GroupsTableModel[] | undefined = groupsData?.map((item) => {
    //     const students = item.groupStudents?.map((item) => {
    //         return item.student.firstName.concat(' ').concat(item.student.lastName);
    //     });

    //     const studentsId = item.groupStudents?.map((item) => {
    //         return item.student.id;
    //     });

    //     return {
    //         key: item.id,
    //         name: item.name,
    //         studentsName: students ? students?.join('; ') : undefined,
    //         numberStudents: students?.length || 0,
    //         studentsId: studentsId
    //     };
    // });

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

            <DataGrid columns={columns} dataSource={[]} showSort showColumnsSelector toolbar={<div></div>} />
        </div>
    );
};

export default AttendanceInfo;
