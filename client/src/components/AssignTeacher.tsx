import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import { FormInstance, useForm, useWatch } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useState } from 'react';

import { AssignTeacherInfo, User } from 'shared/models';

export type AssignTeachersEventFormProps = {
    formRef: React.RefObject<FormInstance<AssignTeacherInfo>>;
    teachers?: User[];
    initialValues?: AssignTeacherInfo;
    onDelete: () => void;
};

const AssignTeacher: React.FC<AssignTeachersEventFormProps> = (props: AssignTeachersEventFormProps) => {
    const [billingType, setBillingType] = useState<string>('');
    useEffect(() => {
        setBillingType(props.formRef.current?.getFieldValue('defaultBilling'))

        if (props.initialValues)
            props.formRef.current?.setFieldsValue(props.initialValues)
    }, [props.formRef.current])

    return (
        <Form
            layout="vertical"
            ref={props.formRef}
        >
            <Row style={{ alignItems: 'center' }} gutter={10}>
                <Col span={11}>
                    <Form.Item
                        name="assignTeacherId"
                        label="Teacher"
                        rules={[
                            {
                                required: true,
                                message: 'required'
                            }
                        ]}
                    >
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
                    <Button size="middle" icon={<DeleteOutlined />} style={{ marginRight: 0 }} onClick={props.onDelete} />
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={11}>
                    <Form.Item
                        name="defaultLessonCategory"
                        label="Default Lesson Category"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Select placeholder="Please select a lesson category">
                            <Option value="group_lesson">Group Lesson</Option>
                            <Option value="lesson">Lesson</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        name="defaultLessonLength"
                        label="Default Lesson Length"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input suffix="minutes" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={11}>
                    <Form.Item
                        name="defaultBilling"
                        label="Default Billing"
                        extra="Charges will automatically adjust to lesson length"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="auto" onClick={() => setBillingType('auto')}>Don't automatically create any calendar-generated charges</Radio>
                                <Radio value="perLesson"  onClick={() => setBillingType('perLesson')}>Student pays based on the number of lessons taken</Radio>
                                <Radio value="perMonth" onClick={() => setBillingType('perMonth')}>Student pays the same amount each month regardless of number of lessons</Radio>
                                <Radio value="perHour" onClick={() => setBillingType('perHour')}>Student pays an hourly rate</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={11}></Col>
            </Row>

            {billingType && billingType.toString() !== 'auto' ? (
                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="defaultPrice" label="Price" rules={[{ required: billingType.toString() !== 'auto' }]}>
                            <Input prefix="$" suffix={billingType.toString()} defaultValue={30} />
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
