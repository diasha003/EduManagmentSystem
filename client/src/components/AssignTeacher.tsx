import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Select, Space } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';

import { AssignTeacherInfo, User } from 'shared/models';

export type AssignTeachersEventFormProps = {
    teachers?: User[];
    initialValues?: AssignTeacherInfo;
    onChange: (value: AssignTeacherInfo) => void;
};

const AssignTeacher: React.FC<AssignTeachersEventFormProps> = (props: AssignTeachersEventFormProps) => {
    const [form] = useForm<AssignTeacherInfo>();

    useEffect(() => {
        if (props.initialValues) form.setFieldsValue(props.initialValues);
    }, [form, props.initialValues]);

    const [billingType, setBillingType] = useState<string>('auto');

    const onChangeRadioGroupBillingType = (e: RadioChangeEvent) => {
        setBillingType(e.target.value);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFieldsChange={() => {
                props.onChange(form.getFieldsValue());
            }}
        >
            <Row style={{ alignItems: 'center' }} gutter={10}>
                <Col span={11}>
                    <Form.Item name="assignTeacherId" label="Teacher">
                        <Select placeholder="Please select a teacher">
                            {props.teachers?.map((teacher) => (
                                <Option value={teacher.id.toString()}>
                                    {teacher.firstName} {teacher.lastName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={11} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="middle" icon={<DeleteOutlined />} style={{ marginRight: 0 }} />
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={11}>
                    <Form.Item name="defaultLessonCategory" label="Default Lesson Category">
                        <Select placeholder="Please select a lesson category" defaultValue={'lesson'}>
                            <Option value="group_lesson">Group Lesson</Option>
                            <Option value="lesson">Lesson</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item name="defaultLessonLength" label="Default Lesson Length">
                        <Input suffix="minutes" defaultValue={30} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={11}>
                    <Form.Item name="defaultBilling" label="Default Billing" extra="Charges will automatically adjust to lesson length">
                        <Radio.Group onChange={onChangeRadioGroupBillingType} value={billingType} defaultValue={'auto'}>
                            <Space direction="vertical">
                                <Radio value="auto">Don't automatically create any calendar-generated charges</Radio>
                                <Radio value="perLesson">Student pays based on the number of lessons taken</Radio>
                                <Radio value="perMonth">Student pays the same amount each month regardless of number of lessons</Radio>
                                <Radio value="perHour">Student pays an hourly rate</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={11}></Col>
            </Row>

            {billingType !== 'auto' ? (
                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="defaultPrice" label="Price" rules={[{ required: billingType !== 'auto' }]}>
                            <Input prefix="$" suffix={billingType} defaultValue={30} />
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>
            ) : (
                <></>
            )}
        </Form>
    );
};

export default AssignTeacher;
