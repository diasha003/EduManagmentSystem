import { CarryOutOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Dropdown, DropdownProps, MenuProps, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import dayjs, { Dayjs } from 'dayjs';
import { EventDto } from 'shared/models';
import { DateTimeService } from 'shared/services';
import CalendarEvent from './CalendarEvent';
import { dayOfWeek, monthOfYear } from '../../../helpers/NumberHelper';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export type CalendarDayProps = {
    day: Dayjs;
    events: EventDto[];
    selectedDate?: Dayjs;
    onOpenQuickLessonForm: () => void;
    onOpenNonTeachingForm: () => void;
    onCellClick: (day: Dayjs) => void;
};

const CalendarDay: React.FC<CalendarDayProps> = (props: CalendarDayProps) => {
    const { day, events, selectedDate } = props;
    const navigate = useNavigate();

    const [showContextMenu, setShowContextMenu] = useState(false);

    const renderAction = (icon: JSX.Element, title: string, description: string, onClick?: () => void) => {
        return (
            <Row gutter={14} style={{ marginBottom: '8px', cursor: 'pointer' }} onClick={onClick}>
                <Col span={2}>{icon}</Col>
                <Col span={12}>
                    <h4>{title}</h4>
                    <span>{description}</span>
                </Col>
            </Row>
        );
    };

    useEffect(() => {
        if (!selectedDate?.isSame(day)) {
            setShowContextMenu(false);
        }
    }, [selectedDate]);

    const items: MenuProps['items'] = [];
    const date = new Date(day.format('YYYY-MM-DD'));
    const cellEvents = events?.filter((x) => DateTimeService.isSameDate(x.date, date)) ?? [];

    const dropdownRender: DropdownProps['dropdownRender'] = (origin) => {
        return (
            <Card>
                <Meta title={`${dayOfWeek(day.day())}, ${monthOfYear(day.month())} ${day.date()}, ${day.year()}`} description={`${cellEvents.length} Scheduled Event(s)`} />
                <Divider />
                {renderAction(<CarryOutOutlined />, 'Quick-Add Lesson', 'Create a new lesson with your default category, length, and price', () => {
                    props.onOpenQuickLessonForm();
                })}
                {renderAction(<CarryOutOutlined />, 'New Event', 'Create a new event with custom settings', () => {
                    navigate('/new-event');
                })}
                {renderAction(<CarryOutOutlined />, 'New Non-Teaching Event', "Create a new event that doesn't require students", () => {
                    props.onOpenNonTeachingForm();
                })}
            </Card>
        );
    };

    return (
        <Dropdown open={showContextMenu && props.selectedDate?.isSame(day)} menu={{ items }} dropdownRender={dropdownRender}>
            <div
                className="ant-picker-cell-inner ant-picker-calendar-date"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setShowContextMenu(!showContextMenu);
                    props.onCellClick(day);
                }}
            >
                <div className="ant-picker-calendar-date-value">{day.date()}</div>
                <div className="ant-picker-calendar-date-content" style={{ minHeight: '86px', height: 'min-content' }}>
                    <ul className="events">
                        {cellEvents.map((x) => (
                            <li>
                                <CalendarEvent event={x} selectedDate={props.selectedDate} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Dropdown>
    );
};

export default CalendarDay;
