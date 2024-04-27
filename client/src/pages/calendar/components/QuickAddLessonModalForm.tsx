import { Button, Checkbox, Col, Collapse, DatePicker, Form, GetProp, Input, Modal, Radio, Row, Select, Space, TimePicker } from 'antd';
import { Option } from 'antd/es/mentions';
import { useState } from 'react';

import { RedoOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { dayOfWeek, getNumberOfWeek, nthNumber } from '../../../helpers/NumberHelper';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type QuickAddLessonModalFormProps = {
    selectedDate: Date;
};

const QuickAddLessonModalForm: React.FC<QuickAddLessonModalFormProps> = (props: QuickAddLessonModalFormProps) => {
    const [open, setOpen] = useState(false);
    const [eventRepeats, setEventRepeats] = useState(false);
    const [repeatIdentity, setRepeatIdentity] = useState(false);
    const [frequencyType, setFrequencyType] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                modal
            </Button>
            <Modal title="Quick-Add Lesson" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} width="720px">
                <Form layout="vertical">
                    <Row gutter={14}>
                        <Col span={12}>
                            <Form.Item name="teacher" label="Teacher">
                                <Select placeholder="select">
                                    <Option value="teacher_1">Teacher_1</Option>
                                    <Option value="teacher_2">Teacher_2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Student"
                                name="student"
                                //rules={[{ required: true, message: "Please input " }]}
                            >
                                <Select placeholder="select">
                                    <Option value="student_1">Student_1</Option>
                                    <Option value="student_2">Student_2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={14}>
                        <Col span={12}>
                            <Form.Item name="" label="Date">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="" label="Time">
                                <TimePicker defaultValue={dayjs('12:08', 'HH:mm')} style={{ width: '100%' }} format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Checkbox checked={eventRepeats} onChange={() => setEventRepeats(!eventRepeats)}>
                        This event repeats
                    </Checkbox>

                    {eventRepeats && (
                        <div className="blockFrequencyType">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '10px'
                                }}
                            >
                                <RedoOutlined />
                                <h3 style={{ margin: '0 0 0 10px' }}>Recurring Event</h3>
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <p>Frequency</p>
                                <Radio.Group
                                    name="frequency"
                                    onChange={(e) => {
                                        setFrequencyType(e.target.value);
                                    }}
                                >
                                    <Radio value="1">Daily</Radio>
                                    <Radio value="2">Weekly</Radio>
                                    <Radio value="3">Monthly</Radio>
                                    <Radio value="4">Yearly</Radio>
                                </Radio.Group>
                            </div>

                            {frequencyType === '1' && (
                                <div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <p>Repeat On</p>
                                        <CheckboxGroup options={plainOptions} onChange={onChange} />
                                    </div>
                                    {!repeatIdentity && (
                                        <div style={{ marginBottom: '10px' }}>
                                            <p>Repeat Until</p>
                                            <DatePicker style={{ width: '100%' }} />
                                        </div>
                                    )}
                                    <Checkbox checked={repeatIdentity} onChange={() => setRepeatIdentity(!repeatIdentity)}>
                                        Repeat indefinitely
                                    </Checkbox>
                                </div>
                            )}

                            {frequencyType === '2' && (
                                <>
                                    <Row gutter={14}>
                                        <Col span={12}>
                                            <Form.Item name="every_week" label="Every">
                                                <Input defaultValue="1" suffix="Week(s)"></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            {!repeatIdentity && (
                                                <Form.Item label="Repeat Until" name="">
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Form.Item>
                                            )}
                                        </Col>
                                    </Row>
                                    <Checkbox checked={repeatIdentity} onChange={() => setRepeatIdentity(!repeatIdentity)}>
                                        Repeat indefinitely
                                    </Checkbox>
                                </>
                            )}

                            {frequencyType === '3' && (
                                <>
                                    <div style={{ marginBottom: '10px' }}>
                                        <p>Repeat On</p>
                                        <Radio.Group onChange={() => {}}>
                                            <Radio value={1}>
                                                The {props.selectedDate.getDate()}
                                                {nthNumber(props.selectedDate.getDate())} of the month
                                            </Radio>
                                            <Radio value={2}>
                                                Every {getNumberOfWeek(props.selectedDate)}
                                                {nthNumber(getNumberOfWeek(props.selectedDate))} {dayOfWeek(props.selectedDate.getDay())}
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                    <Row gutter={14}>
                                        <Col span={12}>
                                            <Form.Item name="every_month" label="Every">
                                                <Input defaultValue="1" suffix="Month(s)"></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            {!repeatIdentity && (
                                                <Form.Item label="Repeat Until" name="">
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Form.Item>
                                            )}
                                        </Col>
                                    </Row>
                                    <div>
                                        <Checkbox checked={repeatIdentity} onChange={() => setRepeatIdentity(!repeatIdentity)}>
                                            Repeat indefinitely
                                        </Checkbox>
                                    </div>
                                </>
                            )}

                            {frequencyType === '4' && (
                                <>
                                    <Row gutter={14}>
                                        <Col span={12}>
                                            <Form.Item name="every_year" label="Every">
                                                <Input defaultValue="1" suffix="Year(s)"></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            {!repeatIdentity && (
                                                <Form.Item label="Repeat Until" name="">
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Form.Item>
                                            )}
                                        </Col>
                                    </Row>
                                    <Checkbox checked={repeatIdentity} onChange={() => setRepeatIdentity(!repeatIdentity)}>
                                        Repeat indefinitely
                                    </Checkbox>
                                </>
                            )}
                        </div>
                    )}

                    <div style={{ marginTop: '15px' }}>
                        <h4>Visibility</h4>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="public">Public - Visible on the Student Portal calendar to all students</Radio>
                                <Radio value="private">Private - Visible on the Student Portal calendar to current attendees only</Radio>
                            </Space>
                        </Radio.Group>

                        <Checkbox value="stateMakeUpCredit" style={{ marginTop: '25px' }}>
                            This event requires a make-up credit
                        </Checkbox>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default QuickAddLessonModalForm;
