import { CalendarOutlined, CaretDownOutlined, FundViewOutlined, LineChartOutlined, PayCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Calendar, Card, Divider, Dropdown, MenuProps, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import './Home.style.css';
import { useAppSelector } from '../../hooks/redux';
import { items } from '../families-invoices/FamiliesInvoicesInfo';
import { useGetAllTeachersQuery } from '../../features/api/extensions/employeesApiExtension';
import { User } from 'shared/models';

interface ICardComponent {
    key: number;
    icon: React.ReactNode;
    count: number;
    description: string;
}

const Home: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(user?.firstName.concat(' ').concat(user.lastName));

    const teachers: User[] | undefined = useGetAllTeachersQuery().currentData;

    const onSelectDate = (date: dayjs.Dayjs) => {
        const jsDate = new Date(date.format());
        setSelectedDate(jsDate);
    };

    const dateSelectionOption: MenuProps['items'] = [
        {
            key: 0,
            label: (
                <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} mode="year" defaultValue={dayjs(selectedDate)} onSelect={(date) => onSelectDate(date)} />
                </div>
            )
        }
    ];

    const allTeachers: MenuProps['items'] = teachers?.map((teacher) => {
        return {
            key: teacher.id,
            label: (
                <div>
                    {teacher?.firstName} {teacher?.lastName}
                </div>
            )
        };
    });

    const handleDropdownItemClick = (e: any) => {
        const currentTeacher = teachers?.find((item) => item.id === Number(e.key));

        setSelectedTeacher(currentTeacher?.lastName.concat(' ').concat(currentTeacher.firstName));
    };

    const infoCards: ICardComponent[] = [
        {
            key: 0,
            icon: <CalendarOutlined />,
            count: 0,
            description: 'Events left this week'
        },
        {
            key: 0,
            icon: <CalendarOutlined />,
            count: 0,
            description: 'Studio events left this week'
        },
        {
            key: 0,
            icon: <PayCircleOutlined />,
            count: 0,
            description: 'Payments received this month'
        },
        {
            key: 0,
            icon: <LineChartOutlined />,
            count: 0,
            description: 'Projects revenue this month'
        },
        {
            key: 0,
            icon: <TeamOutlined />,
            count: 0,
            description: 'Active students'
        }
    ];

    return (
        <>
            <div
                style={{
                    margin: '5px 15px',
                    padding: '10px 10px',
                    background: '#cce5fd'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',

                        margin: '16px 0px'
                    }}
                >
                    {infoCards.map((item) => {
                        return (
                            <Card title={<div className="circleStyle">{item.icon}</div>} bordered={true} style={{ width: 200, height: 200 }} key={item.key}>
                                <div className="cardContent">
                                    <div style={{ fontWeight: 600, color: '#1b2831' }}>{item.count}</div>
                                    <div style={{ textAlign: 'center', color: '#5f7781' }}>{item.description}</div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <div
                style={{
                    margin: '5px 15px',
                    padding: '10px 10px',

                    fontSize: '18px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',

                        margin: '10px 15px'
                    }}
                >
                    <Dropdown menu={{ items: dateSelectionOption }} trigger={['click']}>
                        <Space style={{ fontSize: '18px' }}>
                            {selectedDate.toLocaleString('en-GB', {
                                month: 'long',
                                year: 'numeric'
                            })}

                            <CaretDownOutlined style={{ marginRight: '10px' }} />
                        </Space>
                    </Dropdown>
                    Agenda for
                    <Dropdown
                        menu={{
                            items: allTeachers,
                            onClick: handleDropdownItemClick
                        }}
                        trigger={['click']}
                    >
                        <Space style={{ marginLeft: '10px', fontSize: '18px' }}>
                            {selectedTeacher}
                            <CaretDownOutlined />
                        </Space>
                    </Dropdown>
                </div>
                <Divider />
            </div>

            <div
                style={{
                    margin: '5px 15px',
                    padding: '10px 10px',
                    background: 'white',
                    fontSize: '18px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',

                        margin: '16px 0px'
                    }}
                >
                    info plan
                </div>
            </div>
        </>
    );
};

export default Home;
