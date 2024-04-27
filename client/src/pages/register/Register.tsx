import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import './Register.style.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const validateMessages = {
    required: 'required',
    types: {
        email: 'not a valid email!',
        number: 'not a valid number!',
        string: 'not a valid string!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};

const onFinish = (values: any) => {
    console.log(values);
};

const { Option } = Select;

const Register: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                background: '#dbe8f2'
            }}
        >
            <Form
                {...layout}
                //name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 500,
                    width: '100%',
                    background: 'white',
                    padding: '20px 0px'
                }}
                validateMessages={validateMessages}
            >
                <Form.Item>
                    <h2 style={{ textAlign: 'center' }}>Let's get started!</h2>
                </Form.Item>

                <Form.Item name="firstName" rules={[{ required: true }]}>
                    <Input placeholder="First Name" className="item" />
                </Form.Item>

                <Form.Item name="lastName" rules={[{ required: true }]}>
                    <Input placeholder="Last Name" className="item" />
                </Form.Item>

                <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
                    <Input placeholder="Email" className="item" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password" className="item" />
                </Form.Item>

                <Form.Item name="eduCenterName" rules={[{ type: 'string' }]}>
                    <Input placeholder="Educational Center Name (optional)" className="item" />
                </Form.Item>

                <Form.Item name="size" rules={[{ required: true }]}>
                    <Select placeholder="Select a option and change input text above" defaultValue={{ value: 'size', label: 'Center Size' }}>
                        <Option value="one">It's just me!</Option>
                        <Option value="multiple">With multiple teachers</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')))
                        }
                    ]}
                >
                    <Checkbox>I agree to the Terms of Service and Privacy Policy</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="middle" style={{ width: '100%' }}>
                        Create My Account
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
