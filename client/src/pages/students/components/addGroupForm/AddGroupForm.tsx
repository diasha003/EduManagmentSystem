import React, { useState } from 'react';
import { Button, Col, Form, FormInstance, Input, Modal, Row, Select, SelectProps, Space } from 'antd';
import { useGetAllStudentsQuery } from '../../../../features/api/extensions/studentApiExtension';
import { Student, User } from 'shared/models';

interface IPropsAddGroupModal {
    form: FormInstance<any>;
    handleOk: () => void;
    handleCancel: () => void;
    isModalOpen: boolean;
    isCreate: boolean;
}

const AddGroupModal: React.FC<IPropsAddGroupModal> = (props) => {
    const students: Student[] | undefined = useGetAllStudentsQuery().currentData;

    const options: SelectProps['options'] = students?.map((value) => {
        return { label: `${value.firstName} ${value.lastName}`, value: value.id };
    });

    return (
        <>
            <Modal title="Add Student Group" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel} centered width={800}>
                <Form layout="vertical" onFinish={props.handleOk} form={props.form}>
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>

                    <Form.Item name="groupStudents" label="Assigned Students">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select students"
                            options={options}
                            optionRender={(option) => (
                                <Space>
                                    <span>{option.data.label}</span>
                                </Space>
                            )}
                        />
                    </Form.Item>
                    <Form.Item style={{ display: 'none' }} name="id"></Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddGroupModal;
