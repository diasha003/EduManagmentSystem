import { Checkbox, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, Select, Space, theme } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';

import { useState } from 'react';
import { QuickLessonModel } from 'shared/models';
import { useCreateEventMutation } from '../../features/api/extensions/calendarApiExtension';
import { Content } from 'antd/es/layout/layout';
import RepeatableEventForm from '../../components/RepeatableEventForm';
import TextArea from 'antd/es/input/TextArea';
import { useGetAllEmployeesQuery } from '../../features/api/extensions/employeesApiExtension';

export type NewCalendarEventProps = {
    selectedDate: Date;
};

const NewCalendarEvent: React.FC<NewCalendarEventProps> = (props: NewCalendarEventProps) => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    const [form] = useForm<QuickLessonModel>();
    const [eventRepeats, setEventRepeats] = useState(false);
    const [addSubstituteTeacher, setAddSubstituteTeacher] = useState(false);
    const [create] = useCreateEventMutation();

    const { data: teachers } = useGetAllEmployeesQuery();

    return (
        <Content>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form
                    layout="vertical"
                    form={form}
                    style={{
                        background: '#ffffff',
                        width: '65%',
                        margin: '20px 0px',
                        padding: '24px'
                    }}
                >
                    <h2>New Calendar Event</h2>

                    <Row gutter={14} style={{ alignItems: 'center' }}>
                        <Col span={12}>
                            <Form.Item name="teacher" label="Teacher">
                                <Select placeholder="Teacher">
                                    {teachers?.map(x => <Option value={x.id.toString()}>{x.lastName} {x.firstName}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Checkbox checked={addSubstituteTeacher} onChange={() => setAddSubstituteTeacher(!addSubstituteTeacher)}>
                                Add substitute teacher
                            </Checkbox>
                        </Col>
                    </Row>

                    <Form.Item name="isPublic" label="Visibility" style={{ marginTop: '15px' }}>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={true}>Public - Visible on the Student Portal calendar to all students</Radio>
                                <Radio value={false}>Private - Visible on the Student Portal calendar to current attendees only</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="stateMakeUpCredit" valuePropName="checked">
                        <Checkbox>This event requires a make-up credit</Checkbox>
                    </Form.Item>

                    <Form.Item name="allowRegisterThroughStudentPortal" valuePropName="checked">
                        <Checkbox>Allow students to register through the Student Portal</Checkbox>
                    </Form.Item>

                    <Divider type="horizontal" />

                    <Form.Item name="attendees" label="Attendees">
                        <Select placeholder="No assigned students">
                            <Option value="1">Student_1</Option>
                            <Option value="1">Student_2</Option>
                        </Select>
                    </Form.Item>

                    <Row gutter={14}>
                        <Col span={12}>
                            <Form.Item name="category" label="Category">
                                <Select placeholder="Category">
                                    <Option value="1">Lesson</Option>
                                    <Option value="1">Exam</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Location" name="location">
                                <Select placeholder="Location">
                                    <Option value="1">Campus</Option>
                                    <Option value="2">Online</Option>
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

                    <Row gutter={14} style={{ alignItems: 'center' }}>
                        <Col span={12}>
                            <Form.Item name="duration" label="Duration">
                                <Input suffix="Minutes" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="allDay" valuePropName="checked" style={{ margin: 0 }}>
                                <Checkbox>All day</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Checkbox checked={eventRepeats} onChange={() => setEventRepeats(!eventRepeats)} style={{ marginBottom: '10px' }}>
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

                    <Form.Item name="pricing" label="Student Pricing" style={{ marginBottom: '10px' }}>
                        <Radio.Group>
                            <Radio value={1}>Student Default</Radio>
                            <Radio value={2}>No charge ($0.00)</Radio>
                            <Radio value={3}>Specify price per student</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Divider type="horizontal" />

                    <Form.Item name="publicDescription" label="Public Description">
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="showPublicDescriptionOnCalendar" valuePropName="checked">
                        <Checkbox>Show public description directly on calendar</Checkbox>
                    </Form.Item>

                    <Form.Item name="privateDescription" label="Private Description">
                        <TextArea />
                    </Form.Item>
                </Form>
            </div>
        </Content>
    );
};

export default NewCalendarEvent;
