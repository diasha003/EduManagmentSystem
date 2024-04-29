import React from 'react';
import { Button, Checkbox, Flex, Form, Input, InputNumber, Select } from 'antd';
import './Register.style.css';
import { useRegisterMutation } from '../../features/api/extensions/authApiExtension';
import { IRegisterRequest } from '../../models/api/auth/auth.user';
import { Link, useNavigate } from 'react-router-dom';

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

interface IFormModel {
    eduCenterName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    size: string;
}

const { Option } = Select;

const Register: React.FC = () => {
    const [registerUser] = useRegisterMutation();
    const [form] = Form.useForm<IFormModel>();

    const navigate = useNavigate();

    const onFinish = async (formModel: IFormModel) => {
        await registerUser({
            email: formModel.email,
            firstName: formModel.firstName,
            lastName: formModel.lastName,
            password: formModel.password,
            centerName: formModel.eduCenterName
        } as IRegisterRequest);
        form.resetFields();
        navigate('/login');
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
                form={form}
                {...layout}
                onFinish={(formModel) => void onFinish(formModel)}
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

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{color: "gray"}}>
                        Already a member? <Link to={'/login'}>Log In</Link>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default Register;
