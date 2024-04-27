import { CalendarOutlined, CaretDownOutlined, CarryOutOutlined, CloudUploadOutlined, PlusOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Calendar, CalendarProps, Divider, Row, Col, DropdownProps, Layout, Card } from 'antd';
import './Calendar.style.css';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import QuickAddLessonModalForm from './components/QuickAddLessonModalForm';
import { dayOfWeek, monthOfYear } from '../../helpers/NumberHelper';
import Icon from '@ant-design/icons/lib/components/Icon';
import Meta from 'antd/es/card/Meta';

const calendarAddOptions: MenuProps['items'] = [
    {
        icon: <CarryOutOutlined />,
        key: 0,
        label: 'Quick-Add Lesson'
    },
    {
        icon: <CalendarOutlined />,
        key: 1,
        label: 'Add New Event'
    },
    {
        icon: <CloudUploadOutlined />,
        key: 2,
        label: 'Add Non-Teaching Event'
    }
];

const calendarOptions: MenuProps['items'] = [
    {
        icon: <></>,
        key: 0,
        label: 'Calendar Preferences'
    },
    {
        icon: <></>,
        key: 1,
        label: 'Categories & Locations'
    },
    {
        icon: <></>,
        key: 2,
        label: 'Lesson Note Templates'
    },

    {
        icon: <></>,
        key: 3,
        label: 'Sync Calendar'
    }
];

const calendarDisplayType: MenuProps['items'] = [
    {
        key: 0,
        label: 'Month'
    },
    {
        key: 1,
        label: 'Year'
    }
];

const CalendarTest: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const onSelectDate = (date: dayjs.Dayjs) => {
        new Date(date.date());
        setSelectedDate(new Date(date.format()));
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

    const cellRenderer: CalendarProps<Dayjs>['fullCellRender'] = (current, info) => {
        const renderAction = (icon: JSX.Element, title: string, description: string) => {
            return (
                <Row gutter={14} style={{ marginBottom: '8px', cursor: 'pointer' }}>
                    <Col span={2}>{icon}</Col>
                    <Col span={12}>
                        <h4>{title}</h4>
                        <span>{description}</span>
                    </Col>
                </Row>
            );
        };

        const items: MenuProps['items'] = [];

        const dropdownRender: DropdownProps['dropdownRender'] = (origin) => {
            return (
                <Card>
                    <Meta title={`${dayOfWeek(current.day())}, ${monthOfYear(current.month())} ${current.date()}, ${current.year()}`} description="0 Scheduled Event(s)" />
                    <Divider />
                    {renderAction(<CarryOutOutlined />, 'Quick-Add Lesson', 'Create a new lesson with your default category, length, and price')}
                    {renderAction(<CarryOutOutlined />, 'New Event', 'Create a new event with custom settings')}
                    {renderAction(<CarryOutOutlined />, 'New Non-Teaching Event', "Create a new event that doesn't require students")}
                </Card>
            );
        };

        return (
            <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
                <div className="ant-picker-cell-inner ant-picker-calendar-date">
                    <div className="ant-picker-calendar-date-value">{current.date()}</div>
                    <div className="ant-picker-calendar-date-content"></div>
                </div>
            </Dropdown>
        );
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: '10px 15px'
                }}
            >
                <Dropdown menu={{ items: dateSelectionOption }} trigger={['click']}>
                    <Space>
                        {selectedDate.toLocaleString('en-GB', {
                            month: 'long',
                            year: 'numeric'
                        })}
                        <CaretDownOutlined />
                    </Space>
                </Dropdown>

                {/* <a>Today</a> */}
                <QuickAddLessonModalForm selectedDate={selectedDate}></QuickAddLessonModalForm>
            </div>

            <div
                style={{
                    margin: '5px 15px',
                    padding: '1px 10px',
                    background: 'white'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '16px 0px'
                    }}
                >
                    <Space>
                        <Dropdown menu={{ items: calendarAddOptions }} trigger={['click']}>
                            <Button icon={<PlusOutlined />} type="primary" className="button">
                                <Space>
                                    Add Event
                                    <CaretDownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>

                        <Dropdown menu={{ items: calendarOptions }} trigger={['click']}>
                            <Button icon={<SettingOutlined />} type="default" className="button">
                                <Space>
                                    Options
                                    <CaretDownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>

                        <Button icon={<PrinterOutlined />} type="default" className="button">
                            Print
                        </Button>
                    </Space>
                    <Space>
                        <Dropdown menu={{ items: calendarDisplayType }} trigger={['click']}>
                            <Button type="default" className="button">
                                <Space>
                                    Display Type
                                    <CaretDownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>

                        <Button>Search</Button>
                    </Space>
                </div>

                <Calendar
                    style={{
                        borderTopStyle: 'groove'
                    }}
                    onSelect={(date) => onSelectDate(date)}
                    defaultValue={dayjs(selectedDate)}
                    fullCellRender={cellRenderer}
                />
            </div>
        </>
    );
};

export default CalendarTest;
