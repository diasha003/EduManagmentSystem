import React, { useState } from 'react';
import { Button, Checkbox, Col, Collapse, DatePicker, Divider, Form, Input, Radio, RadioChangeEvent, Row, Select, Space, Steps, Typography } from 'antd';

import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import './CreateEmployeeForm.style.css';

const CreateEmployeeForm: React.FC = () => {
    const [payrollType, setPayrollType] = useState<string>('');

    const steps = [
        {
            key: 0,
            content: (
                <Form layout="vertical" className="formStyle">
                    <Row gutter={10}>
                        <Col span={11}>
                            <h2 style={{ margin: '15px 0px' }}>Teacher Details</h2>
                        </Col>
                        <Col span={11}></Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={11}>
                            <Form.Item
                                name="first_name"
                                label="First Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input  '
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input ' }]}>
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
                            <Form.Item label="Phone Number" name="phone_number">
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
                            <Form.Item name="note" label="Address" style={{ padding: 0 }}>
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className="divider">
                        <Divider />
                    </Row>

                    <Row>
                        <Col span={22}>
                            <Form.Item
                                name="payroll"
                                label="Payroll"
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Radio.Group
                                    onChange={(e) => {
                                        setPayrollType(e.target.value);
                                    }}
                                >
                                    <Space direction="vertical">
                                        <Radio value={'1'}>No automatic payroll calculation</Radio>
                                        <Radio value={'2'}>Percentage of Teacher's revenue</Radio>
                                        <Radio value={'3'}>Flat hourly rate</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    {payrollType === '2' && (
                        <>
                            <Row gutter={10}>
                                <Col span={11}>
                                    <Form.Item name="pay_rate" label="Pay Rate" required={payrollType === '2' ? true : false}>
                                        <Input suffix="% of Revenue"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={11}></Col>
                            </Row>

                            <Row gutter={10}>
                                <Col span={11}>
                                    <Form.Item name="make_up_credits" label="Make-Up Credits" required={payrollType === '2' ? true : false}>
                                        <Radio.Group>
                                            <Space direction="vertical">
                                                <Radio value={'1'}>Pay when a make-up credit is issued</Radio>
                                                <Radio value={'2'}>Percentage of Teacher's revenue</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={11}></Col>
                            </Row>
                        </>
                    )}

                    {payrollType === '3' && (
                        <>
                            <Row gutter={10}>
                                <Col span={11}>
                                    <Form.Item name="pay_rate" label="Pay Rate" required={payrollType === '3' ? true : false}>
                                        <Input prefix="$" suffix="Per Hour"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={11}></Col>
                            </Row>

                            <Row gutter={10}>
                                <Col span={11}>
                                    <Form.Item name="make_up_credits" label="Make-Up Credits" required={payrollType === '3' ? true : false}>
                                        <Radio.Group>
                                            <Space direction="vertical">
                                                <Radio value={'1'}>Pay when a make-up credit is issued</Radio>
                                                <Radio value={'2'}>Percentage of Teacher's revenue</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={11}></Col>
                            </Row>
                        </>
                    )}

                    <Row className="divider">
                        <Divider />
                    </Row>
                </Form>
            )
        },
        {
            key: 1,
            content: (
                <Form layout="vertical" className="formStyle">
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
                            <Form.Item name="checkbox-group" label="Manage Self">
                                <Checkbox.Group>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Checkbox value="1.1">Take attendance</Checkbox>
                                        <Checkbox value="1.2">Record payments with attendance</Checkbox>
                                        <Checkbox value="1.3">Edit own lessons/events</Checkbox>
                                        <Checkbox value="1.4">View own payroll privileges</Checkbox>
                                        <Checkbox value="1.5">Add/edit mileage</Checkbox>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                        <Col span={11}></Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={11}>
                            <Form.Item name="checkbox-group" label="Manage Other Teachers">
                                <Checkbox.Group>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Checkbox value="1.1">View other teacher and user contact info</Checkbox>
                                        <Checkbox value="1.2">Manage students and other teachers' lesson/events</Checkbox>
                                        <Checkbox value="1.3">View other teachers' lesson/events</Checkbox>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                        <Col span={11}></Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={11}>
                            <Form.Item name="checkbox-group" label="......  добавить ещё другие">
                                <Checkbox.Group>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}></div>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                        <Col span={11}></Col>
                    </Row>
                </Form>
            )
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
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => alert('Processing complete!')}>
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
