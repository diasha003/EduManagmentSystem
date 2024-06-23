import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarOutlined, CaretDownOutlined, CarryOutOutlined, CloudUploadOutlined, PlusOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Calendar, CalendarProps, Divider, Row, Col, DropdownProps, Layout, Card, Badge, Cascader } from 'antd';
import Meta from 'antd/es/card/Meta';
import { EventDto, EventsFilter, User } from 'shared/models';
import { DateTimeService } from 'shared/services';

import QuickAddLessonModalForm from './components/QuickAddLessonModalForm';
import { dayOfWeek, monthOfYear } from '../../helpers/NumberHelper';
import NonTeachingEventModalForm from './components/NonTeachinEventModalForm';
import { useGetEventsQuery } from '../../features/api/extensions/calendarApiExtension';

import './Calendar.style.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useGetAllCenterNameQuery } from '../../features/api/extensions/employeesApiExtension';
import { useGetAllUserQuery } from '../../features/api/extensions/userApiExtension';
import CalendarEvent from './components/CalendarEvent';
import CalendarDay from './components/CalendarDay';

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

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

const AppCalendar: React.FC = () => {
    const navigator = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const centerUsersMap = new Map<string, { teachers: any[]; students: any[] }>();
    const allUser = useGetAllUserQuery().currentData;

    allUser?.forEach((user) => {
        const { centerName, roles } = user;
        const role = roles.includes('TEACHER') ? 'teachers' : 'students';

        if (!centerUsersMap.has(centerName)) {
            centerUsersMap.set(centerName, { teachers: [], students: [] });
        }

        centerUsersMap.get(centerName)?.[role].push(user);
    });

    const options: Option[] = [];

    centerUsersMap?.forEach((usersData, centerName) => {
        const centerOption: Option = {
            value: centerName,
            label: centerName,
            children: []
        };

        if (usersData && usersData.teachers) {
            usersData.teachers.forEach((teacher) => {
                const teacherOption: Option = {
                    value: teacher.id,
                    label: `${teacher.firstName} ${teacher.lastName}`,
                    children: []
                };

                if (teacher.students) {
                    teacher.students.forEach((student: User) => {
                        const studentOption: Option = {
                            value: student.id.toString(),
                            label: `${student.firstName} ${student.lastName}`
                        };

                        teacherOption?.children?.push(studentOption);
                    });
                }

                centerOption?.children?.push(teacherOption);
            });
        }

        options.push(centerOption);
    });

    const [isQuickLessonFormOpen, setIsQuickLessonFormOpen] = useState(false);
    const [isNonTeachingEventFormOpen, setIsNonTeachingEventFormOpen] = useState(false);

    const calendarAddOptions: MenuProps['items'] = [
        {
            icon: <CarryOutOutlined />,
            key: 0,
            label: 'Quick-Add Lesson',
            onClick: () => setIsQuickLessonFormOpen(true)
        },
        {
            icon: <CalendarOutlined />,
            key: 1,
            label: 'Add New Event',
            onClick: () => navigator('/new-event')
        },
        {
            icon: <CloudUploadOutlined />,
            key: 2,
            label: 'Add Non-Teaching Event',
            onClick: () => setIsNonTeachingEventFormOpen(true)
        }
    ];

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [actionMenuDate, setActionMenuDate] = useState<dayjs.Dayjs | undefined>(undefined);

    const [eventsFilter, setEventsFilter] = useState<EventsFilter>({
        userId: user && user.id ? user.id : 0,
        dateFrom: DateTimeService.toFirstDayOfMonth(new Date()),
        dateTo: DateTimeService.toLastDayOfMonth(new Date())
    });
    const { data: events } = useGetEventsQuery({ ...eventsFilter! });

    const onSelectDate = (date: dayjs.Dayjs) => {
        const jsDate = new Date(date.format());
        setSelectedDate(jsDate);
        setEventsFilter({
            userId: user && user.id ? user.id : 0,
            dateFrom: DateTimeService.toFirstDayOfMonth(jsDate),
            dateTo: DateTimeService.toLastDayOfMonth(jsDate)
        });
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
        return <CalendarDay day={current} events={events ?? []} onOpenQuickLessonForm={() => setIsQuickLessonFormOpen(true)} onOpenNonTeachingForm={() => setIsNonTeachingEventFormOpen(true)} onCellClick={(day) => setActionMenuDate(day)} selectedDate={actionMenuDate} />;
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
                <QuickAddLessonModalForm
                    isOpen={isQuickLessonFormOpen}
                    selectedDate={selectedDate}
                    onCancel={() => setIsQuickLessonFormOpen(false)}
                    onOk={() => {
                        setIsQuickLessonFormOpen(false);
                    }}
                />
                <NonTeachingEventModalForm isOpen={isNonTeachingEventFormOpen} selectedDate={selectedDate} onCancel={() => setIsNonTeachingEventFormOpen(false)} onOk={() => {}} />
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
                        {/* <Dropdown menu={{ items: calendarDisplayType }} trigger={['click']}>
                            <Button type="default" className="button">
                                <Space>
                                    Display Type
                                    <CaretDownOutlined />
                                </Space>
                            </Button>
                        </Dropdown> */}

                        <Cascader options={options} placeholder="Please select" style={{ width: '150px', height: 'auto', marginRight: '120px' }} />
                        <Button>Search</Button>
                    </Space>
                </div>

                <Calendar
                    fullscreen
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

export default AppCalendar;
