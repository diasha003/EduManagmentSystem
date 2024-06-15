import React, { useState } from 'react';
import { Button, Col, Collapse, DatePicker, Divider, Form, Input, Radio, RadioChangeEvent, Row, Select, Space, Steps, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
//import TextArea from 'antd/es/input/TextArea';

import './AddStudentForm.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCreateStudentMutation, useGetAllFamilyQuery } from '../../../../features/api/extensions/studentApiExtension';
import { useAppSelector } from '../../../../hooks/redux';
import { AssignTeacherInfo, CreateStudentDto, User } from 'shared/models';
import { useGetAllTeachersQuery } from '../../../../features/api/extensions/employeesApiExtension';

import AssignTeacher from '../../../../components/AssignTeacher';
import { useForm, useWatch } from 'antd/es/form/Form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const AddStudentForm: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const teachers: User[] | undefined = useGetAllTeachersQuery().currentData;
    const family: User[] | undefined = useGetAllFamilyQuery().currentData;

    const [stepForm] = Form.useForm();
    const [formData, setFormData] = useState<{ [key: string]: any }>({});

    //const [formAssignedTeacher] = useForm<AssignTeacherInfo>();

    const [note, setNote] = useState<string>('');
    const [assignedTeachersMap, setAssignedTeachersMap] = useState<Map<number, AssignTeacherInfo>>(new Map<number, AssignTeacherInfo>());
    const [createStudent] = useCreateStudentMutation();

    const navigate = useNavigate();
    const hasFamily = useWatch('hasFamily', stepForm);

    const onNextFinish = async () => {
        stepForm
            .validateFields({ validateOnly: false })
            .then(() => {
                const formData = stepForm.getFieldsValue();
                setFormData((prev) => {
                    return { ...prev, ...formData };
                });
                next();
            })
            .catch(() => {
                //console.log('catch');
            });
    };

    const onDoneFinish = async () => {
        const data = { ...formData, ...stepForm.getFieldsValue(), assignedTeachers: Array.from(assignedTeachersMap.values()) } as CreateStudentDto;

        //console.log(Array.from(assignedTeachersMap.values()));
        //console.log(data);

        const result = await createStudent({
            ...data,
            centerName: user ? user.centerName : '',
            familyExist: Number(data.familyExist),
            note: data.note
        });

        const error = (result as { error: FetchBaseQueryError | SerializedError }).error;
        if (error) {
            alert(JSON.stringify(error));
            console.log(error);
        } else {
            navigate('/students');
        }
    };

    const onFinish = (values: any) => {
        //console.log('Received values of form: ', values);
    };

    const validateMessages = {
        required: 'required',
        types: {
            email: 'not a valid email!',
            number: 'not a valid number!',
            string: 'not a valid string!'
        }
    };

    const Step1Form = () => {
        return (
            <Form layout="vertical" className="formStyle" onFinish={onFinish} form={stepForm} validateMessages={validateMessages}>
                <Row gutter={10}>
                    <Col span={11}>
                        <h2 style={{ margin: '15px 0px' }}>Student Details</h2>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input first name'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input last name' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Collapse
                    expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 90 : 0} />}
                    defaultActiveKey="1"
                    ghost
                    items={[
                        {
                            key: '1',
                            label: 'Show',
                            children: (
                                <>
                                    <Row gutter={10}>
                                        <Col span={11}>
                                            <Form.Item name="gender" label="Gender  ">
                                                <Select placeholder="Select your gender" style={{ width: '100%', height: 'auto' }}>
                                                    <Option value="male">Male</Option>
                                                    <Option value="female">Female</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={11}>
                                            <Form.Item name="birthdayDate" label="Birthday">
                                                <DatePicker style={{ width: '100%' }} placeholder="Select birthday" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={11}>
                                            <Form.Item name="institution" label="School/University">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11}></Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={11}>
                                            <Form.Item name="dateRegister" label="Student Since">
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11}></Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={22}>
                                            <Form.Item name="skills" label="Skills/Hobbies" extra="Use press the Enter key to separate entries">
                                                <Select
                                                    mode="tags"
                                                    style={{
                                                        width: '100%',
                                                        padding: 0
                                                    }}
                                                    placeholder="Tags Mode"
                                                    options={[{}]}
                                                    dropdownStyle={{ display: 'none' }}
                                                    showSearch={false}
                                                    suffixIcon={<></>}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )
                        }
                    ]}
                />

                <Row>
                    <Col span={22}>
                        <Form.Item
                            name="status"
                            label="Student Status"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="active">Active</Radio>
                                <Radio value="trial">Trial</Radio>
                                <Radio value="inactive">Inactive</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Divider />
                </Row>

                <Row>
                    <Col span={22}>
                        <Form.Item
                            name="type"
                            label="Student Type"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="adult">Adult</Radio>
                                <Radio value="child">Child</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={22}>
                        <Form.Item
                            name="hasFamily"
                            label="This student's family is a/an"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                            extra="Creates a new account in Families & Invoices"
                        >
                            <Radio.Group>
                                <Radio value={false} style={{ marginRight: '190px' }}>
                                    New Family
                                </Radio>
                                <Radio value={true}>Existing Family</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                {!hasFamily ? (
                    <>
                        <Row gutter={10}>
                            <Col span={11}>
                                <Form.Item
                                    name="parentFirstName"
                                    label="Parent First Name"
                                    rules={[
                                        {
                                            required: !hasFamily,
                                            message: 'Please input  '
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item label="Parent Last Name" name="parentLastName" rules={[{ required: !hasFamily, message: 'Please input ' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={11}>
                                <Form.Item name="parentEmail" label="Email" rules={[{ required: !hasFamily }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item label="Phone Number" name="parentPhoneNumber">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={22}>
                                <Form.Item name="parentAddress" label="Address" style={{ padding: 0 }}>
                                    <TextArea rows={3} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Row gutter={10}>
                        <Col span={11}>
                            <Form.Item
                                name="familyExist"
                                label="Family"
                                rules={[
                                    {
                                        required: hasFamily
                                    }
                                ]}
                            >
                                <Select placeholder="Please select a family">
                                    {family?.map((value) => {
                                        return (
                                            <Option value={value.id}>
                                                {value.firstName} {value.lastName}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={11}></Col>
                    </Row>
                )}

                <Divider />

                {Array.from(assignedTeachersMap).map(([key, value]) => {
                    //console.log(value);
                    return (
                        <AssignTeacher
                            key={key}
                            teachers={teachers?.filter((t) => t.id === Number(value.assignTeacherId) || !Array.from(assignedTeachersMap.values()).find((v) => Number(v.assignTeacherId) === t.id))}
                            initialValues={value}
                            onChange={(val) => {
                                setAssignedTeachersMap(new Map(assignedTeachersMap.set(key, val)));
                            }}
                            onDelete={() => {
                                setAssignedTeachersMap((val) => {
                                    val.delete(key);
                                    return new Map(val);
                                });
                            }}
                        />
                    );
                })}

                <Row style={{ alignItems: 'center' }} gutter={10}>
                    <Col span={11}>
                        <Text>Assign Teachers</Text>
                    </Col>
                    <Col span={11} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            size="middle"
                            icon={<PlusOutlined />}
                            style={{ marginRight: 0 }}
                            onClick={(e) => {
                                const teacherKeys = Array.from(assignedTeachersMap.keys());
                                const newKey = teacherKeys.length + 1;
                                setAssignedTeachersMap(new Map(assignedTeachersMap.set(newKey, new AssignTeacherInfo())));
                            }}
                        >
                            Assign Teachers
                        </Button>
                    </Col>
                </Row>

                <Divider />

                <Row>
                    <Col span={22}>
                        <Form.Item name="note" label="Note" style={{ padding: 0 }}>
                            <span style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px' }}>Use this area for any private notes you wish to keep.</span>
                            <TextArea
                                maxLength={100}
                                rows={4}
                                value={note}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                    setNote(e.target.value);
                                }}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    };

    const Step2Form = () => {
        return (
            <Form layout="vertical" className="formStyle" onFinish={onFinish}>
                <Row gutter={10}>
                    <Col span={11}>
                        <h2 style={{ margin: '15px 0px' }}>Set Up Automatic Invoicing</h2>
                        <p>You can set up automatic invoicing now, or you can set it up later in the family account.</p>

                        <Form.Item name="auto" label="Would you like to set up automatic invoicing for this family now?">
                            <Radio.Group onChange={() => {}}>
                                <Space direction="horizontal">
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>
            </Form>
        );
    };

    const steps = [
        {
            key: 0,
            content: <Step1Form />
        },
        {
            key: 1,
            content: <Step2Form />
        }
    ];

    const items = steps.map((item) => ({ key: item.key, title: '' }));

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Steps current={current} items={items} size="small" />
            <Link to="/students" style={{ margin: '10px 0 19px 320px', alignSelf: 'flex-start' }}>
                Back to Students
            </Link>

            {steps[current].content}

            <div style={{ marginTop: 24, marginRight: '320px', alignSelf: 'flex-end' }}>
                {current < steps.length - 1 && (
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            onNextFinish();
                        }}
                    >
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => {
                            onDoneFinish();
                        }}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddStudentForm;
