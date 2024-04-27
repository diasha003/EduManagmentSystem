import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import './Login.style.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const validateMessages = {
    required: 'required',
    types: {
        email: 'not a valid email!'
    }
};

const onFinish = (values: any) => {
    console.log(values);
};

const Login: React.FC = () => {
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
                    <h2 style={{ textAlign: 'center' }}>Welcome back!</h2>
                </Form.Item>

                <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
                    <Input placeholder="Email" className="item" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password" className="item" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="middle" style={{ width: '100%' }}>
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
