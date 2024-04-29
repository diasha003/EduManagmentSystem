import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import './Login.style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/api/extensions/authApiExtension';
import { ILoginRequest } from '../../models/api/auth/auth.user';

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

interface IFormModel {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginUser] = useLoginMutation();
    const [form] = Form.useForm<IFormModel>();

    const navigate = useNavigate();

    const onFinish = async (formModel: IFormModel) => {
        await loginUser({
            email: formModel.email,
            password: formModel.password
        } as ILoginRequest);
        form.resetFields();
        navigate('/home');
    };

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
                form={form}
                onFinish={(formModule) => void onFinish(formModule)}
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

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{ color: 'gray' }}>
                        Not a member? <Link to={'/signup'}>Get started today!</Link>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default Login;
