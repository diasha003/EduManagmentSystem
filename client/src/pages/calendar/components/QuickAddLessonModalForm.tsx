import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Checkbox, Col, DatePicker, Form, Modal, Radio, Row, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';
import { QuickLessonModel } from 'shared/models';

import RepeatableEventForm from '../../../components/RepeatableEventForm';
import { useCreateEventMutation } from '../../../features/api/extensions/calendarApiExtension';
import { DateTimeService } from 'shared/services';
import { useGetAllEmployeesQuery } from '../../../features/api/extensions/employeesApiExtension';
import { useGetAllStudentsQuery } from '../../../features/api/extensions/studentApiExtension';

export type QuickAddLessonModalFormProps = {
    selectedDate: Date;
    isOpen: boolean;
    onCancel: () => void;
    onOk: () => void;
};

const QuickAddLessonModalForm: React.FC<QuickAddLessonModalFormProps> = (props: QuickAddLessonModalFormProps) => {
    const [form] = useForm<QuickLessonModel>();
    const [eventRepeats, setEventRepeats] = useState(false);
    const [create] = useCreateEventMutation();

    const { data: teachers } = useGetAllEmployeesQuery();
    const { data: students } = useGetAllStudentsQuery();

    useEffect(() => {
        form.setFieldValue('date', dayjs(DateTimeService.withTime(props.selectedDate, 0, 0).toLocaleString(undefined, { timeZone: 'UTC' })));
    }, [form, props.selectedDate]);

    const handleOk = async () => {
        const formData = form.getFieldsValue();
        const repeatableEventInfo = form.getFieldValue('repeatableEventInfo');

        await create({
            date: formData.date?.toISOString() as any,
            isPublic: formData.isPublic,
            stateMakeUpCredit: formData.stateMakeUpCredit,
            repeatUntil: repeatableEventInfo?.repeatUntil,
            frequency: repeatableEventInfo?.frequency.toString(),
            repeatOnDaily: repeatableEventInfo?.repeatOnDaily,
            repeatOnMonthly: repeatableEventInfo?.repeatOnMonthly,
            everyMonth: repeatableEventInfo?.everyMonth ? +repeatableEventInfo.everyMonth : undefined,
            everyWeek: repeatableEventInfo?.everyWeek ? +repeatableEventInfo.everyWeek : undefined,
            everyYear: repeatableEventInfo?.everyYear ? +repeatableEventInfo.everyYear : undefined,
            teacherId: +formData.teacher,
            studentId: +formData.student,
            repeatIdentity: formData.repeatableEventInfo?.repeatIdentity,
            duration: 45
        });
        props.onOk?.();
    };

    return (
        <Modal title="Quick-Add Lesson" open={props.isOpen} onOk={handleOk} onCancel={props.onCancel} width="720px">
            <Form layout="vertical" form={form}>
                <Row gutter={14}>
                    <Col span={12}>
                        <Form.Item name="teacher" label="Teacher">
                            <Select placeholder="Teacher">
                                {teachers?.map((x) => (
                                    <Option value={x.id.toString()}>
                                        {x.lastName} {x.firstName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Student" name="student">
                            <Select placeholder="Student">
                                {students?.map((x) => (
                                    <Option value={x.id.toString()}>
                                        {x.lastName} {x.firstName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={14}>
                    <Col span={12}>
                        <Form.Item name="date" label="Date">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12} />
                </Row>

                <Checkbox checked={eventRepeats} onChange={() => setEventRepeats(!eventRepeats)}>
                    This event repeats
                </Checkbox>

                {eventRepeats && (
                    <RepeatableEventForm
                        selectedDate={props.selectedDate}
                        onChange={(val) => {
                            form.setFieldValue('repeatableEventInfo', val);
                        }}
                    />
                )}

                <Form.Item name="isPublic" label="Visibility" style={{ marginTop: '15px' }}>
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value={true}>Public - Visible on the Student Portal calendar to all students</Radio>
                            <Radio value={false}>Private - Visible on the Student Portal calendar to current attendees only</Radio>
                        </Space>
                    </Radio.Group>

                    <Form.Item name="stateMakeUpCredit" valuePropName="checked">
                        <Checkbox style={{ marginTop: '25px' }}>This event requires a make-up credit</Checkbox>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default QuickAddLessonModalForm;
