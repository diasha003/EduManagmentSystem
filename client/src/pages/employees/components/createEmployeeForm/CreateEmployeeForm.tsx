import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Col, Divider, Form, Input, Radio, Row, Space, Steps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { CreateEmployeeDto } from 'shared/models';

import { useCreateMutation } from '../../../../features/api/extensions/employeesApiExtension';
import { useAppSelector } from '../../../../hooks/redux';

import './CreateEmployeeForm.style.css';

const CreateEmployeeForm: React.FC = () => {
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [payrollType, setPayrollType] = useState<string>('');
    const [stepForm] = Form.useForm();

    const state = window.location.href.split(/\/+/).pop();

    const navigate = useNavigate();

    const [createEmployee] = useCreateMutation();
    const user = useAppSelector((state) => state.auth.user);

    const onNextFinish = () => {
        stepForm
            .validateFields({ validateOnly: false })
            .then(() => {
                const formData = stepForm.getFieldsValue();
                setFormData((prev) => {
                    return { ...prev, ...formData };
                });
                next();
            })
            .catch(() => {});
    };

    const onDoneFinish = async () => {
        const data = { ...formData, ...stepForm.getFieldsValue() } as CreateEmployeeDto;

        const result = await createEmployee({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            payrollType: data.payrollType ? data.payrollType : null,
            access: data.access,
            address: data.address,
            makeUpCredits: data.makeUpCredits,
            payRate: data.payRate,
            centerName: user ? user.centerName : '',
            permissions: [...(data.manageOtherTeachers || []), ...(data.manageSelf || []), ...(data.manageStudentsParents || []), ...(data.otherPrivileges || [])],
            password: data.password,
            phoneNumber: data.phoneNumber,
        });

        const error = (result as { error: FetchBaseQueryError | SerializedError }).error;
        if (error) {
            alert(JSON.stringify(error));
            console.log(error);
        } else {
            navigate('/employees');
        }
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
            <Form layout="vertical" className="formStyle" form={stepForm} validateMessages={validateMessages}>
                <Row gutter={10}>
                    <Col span={11}>
                        <h2 style={{ margin: '15px 0px' }}>{state === 'teacher' ? 'Teacher Details' : 'Staff Member Details'}</h2>
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
                                    message: 'Please input'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="access" valuePropName="checked" extra="An email will be sent with a link to set up their password">
                            <Checkbox>Enable login access</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row>
                    <Col span={22}>
                        <Form.Item name="address" label="Address" style={{ padding: 0 }}>
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="divider">
                    <Divider />
                </Row>

                {state === 'teacher' && (
                    <>
                        <Row>
                            <Col span={22}>
                                <Form.Item
                                    name="payrollType"
                                    label="Payroll"
                                    rules={[
                                        {
                                            required: state === 'teacher' ? true : false
                                        }
                                    ]}
                                >
                                    <Radio.Group
                                        onChange={(e) => {
                                            setPayrollType(e.target.value);
                                        }}
                                    >
                                        <Space direction="vertical">
                                            <Radio value={'auto'}>No automatic payroll calculation</Radio>
                                            <Radio value={'percentage'}>Percentage of Teacher's revenue</Radio>
                                            <Radio value={'hourlyRate'}>Flat hourly rate</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        {payrollType === 'percentage' && (
                            <>
                                <Row gutter={10}>
                                    <Col span={11}>
                                        <Form.Item name="payRate" label="Pay Rate" rules={[{ required: payrollType === 'percentage' ? true : false }]}>
                                            <Input suffix="% of Revenue"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}></Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={11}>
                                        <Form.Item name="makeUpCredits" label="Make-Up Credits" rules={[{ required: payrollType === 'percentage' ? true : false }]}>
                                            <Radio.Group>
                                                <Space direction="vertical">
                                                    <Radio value={'issued'}>Pay when a make-up credit is issued</Radio>
                                                    <Radio value={'used'}>Percentage of Teacher's revenue</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}></Col>
                                </Row>
                            </>
                        )}

                        {payrollType === 'hourlyRate' && (
                            <>
                                <Row gutter={10}>
                                    <Col span={11}>
                                        <Form.Item name="payRate" label="Pay Rate" rules={[{ required: payrollType === 'hourlyRate' ? true : false }]}>
                                            <Input prefix="$" suffix="Per Hour"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}></Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={11}>
                                        <Form.Item name="makeUpCredits" label="Make-Up Credits" rules={[{ required: payrollType === 'hourlyRate' ? true : false }]}>
                                            <Radio.Group>
                                                <Space direction="vertical">
                                                    <Radio value={'issued'}>Pay when a make-up credit is issued</Radio>
                                                    <Radio value={'used'}>Percentage of Teacher's revenue</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}></Col>
                                </Row>
                                <Row className="divider">
                                    <Divider />
                                </Row>
                            </>
                        )}
                    </>
                )}
            </Form>
        );
    };

    const Step2Form = () => {
        return (
            <Form layout="vertical" className="formStyle" form={stepForm} validateMessages={validateMessages}>
                <Row gutter={10}>
                    <Col span={11}>
                        <h2 style={{ margin: '15px 0px' }}>Teacher Privileges</h2>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="admin" valuePropName="checked" extra="Administrators can access all parts of My Music Staff and create other users.">
                            <Checkbox>Administrator (all privileges)</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="manageSelf" label="Manage Self">
                            <Checkbox.Group>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Checkbox value="takeAttendance">Take attendance</Checkbox>
                                    <Checkbox value="recordPayments">Record payments with attendance</Checkbox>
                                    <Checkbox value="editOwnLessonsEvents">Edit own lessons/events</Checkbox>
                                    <Checkbox value="viewOwnPayroll">View own payroll privileges</Checkbox>
                                    {/* <Checkbox value="addEditMileage">Add/edit mileage</Checkbox> */}
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="manageOtherTeachers" label="Manage Other Teachers">
                            <Checkbox.Group>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Checkbox value="viewOtherTeachersInfo ">View other teacher and user contact info</Checkbox>
                                    <Checkbox value="manageOtherTeachersLessons">Manage students and other teachers' lesson/events</Checkbox>
                                    <Checkbox value="viewOtherTeachersLessonsEvents">View other teachers' lesson/events</Checkbox>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="manageStudentsParents" label="Manage Students and Parents">
                            <Checkbox.Group>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Checkbox value="viewStudentParentAddressesPhoneNumber">View student/parent addresses and phone numbers</Checkbox>
                                    <Checkbox value="viewStudentParentEmailAddresses ">View student/parent email addresses</Checkbox>
                                    <Checkbox value="viewDownloadStudentProfileAttachments">View/download student profile attachments</Checkbox>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row gutter={10}>
                    <Col span={11}>
                        <Form.Item name="otherPrivileges" label="Other Privileges" extra="Gives access to reports created by other teachers/admins in the business (may contain sensitive data).">
                            <Checkbox.Group>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Checkbox value="addViewInvoicesAccounts">Add/view invoices and accounts</Checkbox>
                                    <Checkbox value="addEditExpensesRevenue">Add/edit expenses and other revenue</Checkbox>
                                    <Checkbox value="addEditDeleteOnlineResources">Can add/edit/delete online resources from the Studio Space</Checkbox>
                                    <Checkbox value="editWebsitePostNews">Edit website and post news</Checkbox>
                                    <Checkbox value="createViewReports">Create/view reports</Checkbox>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                    <Col span={11}></Col>
                </Row>

                <Row className="divider">
                    <Divider />
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
            <Link to="/employees" style={{ margin: '10px 0 19px 320px', alignSelf: 'flex-start' }}>
                Back to Teachers & Staff
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

export default CreateEmployeeForm;
