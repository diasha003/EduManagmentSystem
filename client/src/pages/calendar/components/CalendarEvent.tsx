import { Card, Dropdown, DropdownProps } from 'antd';
import { useState } from 'react';
import { EventDto } from 'shared/models';
import { DateTimeService } from 'shared/services';
import dayjs, { Dayjs } from 'dayjs';

export type CalendarEventProps = {
    event: EventDto;
    selectedDate?: Dayjs;
}

const CalendarEvent: React.FC<CalendarEventProps> = (props: CalendarEventProps) => {
    const { event } = props;

    const [showContextMenu, setShowContextMenu] = useState(false);

    const dropdownRender: DropdownProps['dropdownRender'] = (origin) => {
        return <Card>Edit attendance</Card>;
    };

    return (
        <Dropdown open={showContextMenu && props.selectedDate?.isSame(event.date)} dropdownRender={dropdownRender}>
            <div style={{ backgroundColor: '#afe9f8', paddingLeft: '4px', marginBottom: '4px' }} onClick={() => setShowContextMenu(!showContextMenu)}>
                <div style={{ borderLeft: 'solid 3px #2e568e', padding: '4px', color: '#2e568e' }}>
                    <div>
                        <strong>
                            {DateTimeService.toUiTime(event.date)} - {DateTimeService.toUiTime(DateTimeService.addMinutes(event.date, event.duration))}
                        </strong>
                    </div>
                    <div>Lesson with {event.teacherDisplayName}</div>
                </div>
            </div>
        </Dropdown>
    );
};

export default CalendarEvent;
