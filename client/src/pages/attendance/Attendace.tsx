import { useParams } from 'react-router-dom';
import { useGetEventDetailsQuery } from '../../features/api/extensions/calendarApiExtension';
import { Button, Card, Checkbox, Col, Divider, Form, Input, Radio, RadioChangeEvent, Row } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { DateTimeService } from 'shared/services';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useForm, useWatch } from 'antd/es/form/Form';
import { CreateEventPaymentDto } from 'shared/models';
import { useAssignPaymentMutation } from '../../features/api/extensions/paymentApiExtension';

const Attendace: React.FC = () => {
    const [assignPayment] = useAssignPaymentMutation();

    const { eventId } = useParams();
    const { data: eventDetails } = useGetEventDetailsQuery(+eventId!);
    const [billing, setBilling] = useState('');
    const [paid, setPaid] = useState(false);
    const [absentBilling, setAbsentBilling] = useState('');

    const [form] = useForm<CreateEventPaymentDto>();
    const status = useWatch('status', form);

    const onSave = async () => {
        await assignPayment({
            ...form.getFieldsValue(),
            eventId: +eventId!,
            studentId: eventDetails!.students[0].id,
            teacherId: eventDetails!.teacher.id,
        });
    };

    return (
        eventDetails && (
            <Form layout="vertical" form={form}>
                <Row style={{ alignItems: 'center', marginTop: '30px', marginBottom: '20px', marginLeft: '30px', color: 'blue', justifyContent: 'flex-start', cursor: 'pointer' }}>
                    <LeftOutlined />
                    Back to Calendar
                </Row>
                <Row style={{ gap: '20px' }}>
                    <Card style={{ width: '30%' }}>
                        <Col>
                            <h3>
                                Lesson with {eventDetails?.teacher.firstName} {eventDetails?.teacher.lastName}
                            </h3>
                            <Row style={{ justifyContent: 'flex-start', color: 'gray', gap: '4px', alignItems: 'center' }}>
                                <CalendarOutlined />
                                {DateTimeService.toUiDate(eventDetails.date)}
                            </Row>
                            <Row style={{ justifyContent: 'flex-start', color: 'gray', gap: '4px', alignItems: 'center' }}>
                                <ClockCircleOutlined />
                                {DateTimeService.toUiTime(eventDetails.date)} - {DateTimeService.toUiTime(DateTimeService.addMinutes(eventDetails.date, eventDetails.duration))}
                            </Row>
                            <Divider />
                            <h3>{eventDetails.students.length} Attendees</h3>
                            <Col>
                                <div style={{ marginBottom: '10px' }}>
                                    <Checkbox>Select All</Checkbox>
                                </div>
                                {eventDetails.students.map((student) => (
                                    <div>
                                        <Checkbox>
                                            {student.firstName} {student.lastName}
                                        </Checkbox>
                                    </div>
                                ))}
                            </Col>
                        </Col>
                    </Card>
                    <div style={{ width: '65%' }}>
                        <h1>{eventDetails.students.length} Attendees</h1>
                        <Row style={{ width: '100%', gap: '20px', color: 'gray', justifyContent: 'flex-start', marginBottom: '10px' }}>
                            <Row style={{ gap: '4px', alignItems: 'center' }}>
                                <CalendarOutlined />
                                {DateTimeService.toUiDate(eventDetails.date)}
                            </Row>
                            <Row style={{ gap: '4px', alignItems: 'center' }}>
                                <ClockCircleOutlined />
                                {DateTimeService.toUiTime(eventDetails.date)} - {DateTimeService.toUiTime(DateTimeService.addMinutes(eventDetails.date, eventDetails.duration))}
                            </Row>
                        </Row>
                        <Card style={{ width: '100%' }}>
                            <h2>Attendance</h2>
                            <h4 style={{ color: 'gray' }}>Record attendance for this lesson</h4>

                            <h3>Attendance Status</h3>
                            <Form.Item name="status">
                                <Radio.Group
                                    options={[
                                        {
                                            label: 'Present',
                                            value: 'Present'
                                        },
                                        {
                                            label: 'Absent',
                                            value: 'Absent'
                                        },
                                        {
                                            label: 'Teacher Canceled',
                                            value: 'Teacher Canceled'
                                        }
                                    ]}
                                />
                            </Form.Item>
                            {status === 'Absent' && (
                                <>
                                    <Radio.Group
                                        value={absentBilling}
                                        onChange={({ target: { value } }: RadioChangeEvent) => setAbsentBilling(value)}
                                        options={[
                                            {
                                                label: 'Not Billable',
                                                value: 'NotBillable'
                                            },
                                            {
                                                label: 'Billable',
                                                value: 'Billable'
                                            }
                                        ]}
                                    />
                                </>
                            )}
                            {(status === 'Present' || absentBilling === 'Billable') && (
                                <>
                                    <h3 style={{ marginTop: '20px' }}>Attendance Billing</h3>
                                    <div>
                                        <Radio.Group
                                            value={billing}
                                            onChange={({ target: { value } }: RadioChangeEvent) => setBilling(value)}
                                            options={[
                                                {
                                                    label: 'Lesson is Billable',
                                                    value: 'Lesson is Billable'
                                                }
                                            ]}
                                        />
                                    </div>
                                    {billing == 'Lesson is Billable' && (
                                        <>
                                            <Row style={{ justifyContent: 'flex-start', alignItems: 'center', gap: '25px', marginTop: '10px' }}>
                                                <Col span={2}>
                                                    <Form.Item name="price" label="Lesson Price">
                                                        <Input suffix="$" />
                                                    </Form.Item>
                                                </Col>
                                                <Checkbox checked={paid} onChange={() => setPaid(!paid)}>
                                                    Student paid at lesson
                                                </Checkbox>
                                            </Row>
                                            {paid && (
                                                <Col span={6}>
                                                    <Form.Item name="amountPaid" label="Amout Paid">
                                                        <Input suffix="$" />
                                                    </Form.Item>
                                                </Col>
                                            )}
                                            <Col>
                                                <Form.Item name="note" label="Add a Payment Note">
                                                    <TextArea rows={6} />
                                                </Form.Item>
                                            </Col>
                                        </>
                                    )}
                                </>
                            )}
                        </Card>
                        <Row style={{ justifyContent: 'flex-end', marginTop: '10px', gap: '10px' }}>
                            <Button>Cancel</Button>
                            <Button type="primary" onClick={() => void onSave()}>
                                Save
                            </Button>
                            <Button type="primary">Save & Exit</Button>
                        </Row>
                    </div>
                </Row>
            </Form>
        )
    );
};

export default Attendace;
