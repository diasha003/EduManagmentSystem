import React, { useEffect, useState } from 'react';

import { Button, Space, Dropdown, Form, Input } from 'antd';
import { CaretDownOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { DataGrid, DataGridColumn } from '../../../../components/DataGrid/DataGrid';
import { Group } from 'shared/models';
import AddGroupModal from '../addGroupForm/AddGroupForm';
import { useCreateGroupMutation, useDeleteGroupMutation, useGetAllGroupsQuery, useGetCountRecordsGroupsQuery, useGetRecordsGroupsQuery, useUpdateGroupMutation } from '../../../../features/api/extensions/studentApiExtension';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Icon from '@ant-design/icons/lib/components/Icon';
import { get, map } from 'lodash';

//import _ from 'lodash';

const Search = Input.Search;

export interface GroupsTableModel {
    key: number;
    name: string;
    numberStudents: number;
    studentsName?: string;
    operation?: React.ReactElement;
    studentsId?: number[];
}

const GroupsTable: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(true);

    //const data: Group[] | undefined = useGetAllGroupsQuery().currentData;

    const [numberPage, setNumberPage] = useState<number>(1);
    const countRecords = useGetCountRecordsGroupsQuery().currentData;

    const groupsData: Group[] | undefined = useGetRecordsGroupsQuery({ skipCount: numberPage, takeCount: 10 }).currentData;

    const [createGroup] = useCreateGroupMutation();
    const [deleteGroup] = useDeleteGroupMutation();
    const [updateGroup] = useUpdateGroupMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            setIsModalOpen(false);
            let result;
            if (isCreateModal) {
                result = await createGroup(form.getFieldsValue());
            } else {
                try {
                    //console.log(form.getFieldsValue());
                    result = await updateGroup(form.getFieldsValue());
                } catch (err) {
                    console.log(err);
                }
            }
            form.resetFields();

            const error = (result as { error: FetchBaseQueryError | SerializedError }).error;
            if (error) {
                alert(JSON.stringify(error));
                console.log(error);
            } else {
                form.resetFields();
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onDeleteClick = async (id: number) => {
        try {
            await deleteGroup(id);
        } catch (error) {
            console.log(error);
        }
    };

    const columns: DataGridColumn<GroupsTableModel>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            fixed: 'left',
            hidden: false,
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Students',
            dataIndex: 'studentsName',
            key: 'studentsName',
            width: 200,
            fixed: 'left',
            hidden: false,
            sorter: (a, b) => (a.studentsName?.length ?? 0) - (b.studentsName?.length ?? 0)
        },
        {
            title: 'Number of Students',
            dataIndex: 'numberStudents',
            key: 'numberStudents',
            width: 150,
            hidden: false,
            sorter: (a, b) => a.numberStudents - b.numberStudents
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 22,
            hidden: false,
            render: (value) => {
                return (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',

                                    label: (
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                            <EditOutlined />
                                            <p style={{ margin: '0 0 0 4px' }}>Edit</p>
                                        </div>
                                    )
                                },
                                {
                                    type: 'divider'
                                },

                                {
                                    key: '2',

                                    label: (
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                            <DeleteOutlined />
                                            <p style={{ margin: '0 0 0 4px' }}>Delete</p>
                                        </div>
                                    )
                                }
                            ],
                            selectable: true,
                            onClick: (e) => {
                                let index = 0;
                                if (e.key === '1') {
                                    form.setFieldsValue({
                                        id: value.key,
                                        name: value.name,
                                        groupStudents:
                                            value.studentsName.length !== 0
                                                ? value.studentsName.split('; ').map((item: any) => {
                                                      return { label: item, value: value.studentsId[index++] };
                                                  })
                                                : undefined
                                    });
                                    setIsCreateModal(false);
                                    showModal();
                                } else if (e.key === '2') {
                                    onDeleteClick(value.key);
                                }
                            }
                        }}
                    >
                        <Space>
                            <MoreOutlined style={{ fontSize: '20px' }} />
                        </Space>
                    </Dropdown>
                );
            }
        }
    ];

    const newData: GroupsTableModel[] | undefined = groupsData?.map((item) => {
        const students = item.groupStudents?.map((item) => {
            return item.student.firstName.concat(' ').concat(item.student.lastName);
        });

        const studentsId = item.groupStudents?.map((item) => {
            return item.student.id;
        });

        return {
            key: item.id,
            name: item.name,
            studentsName: students ? students?.join('; ') : undefined,
            numberStudents: students?.length || 0,
            studentsId: studentsId
        };
    });

    let [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<GroupsTableModel[]>([]);

    const onSearch = (e: any) => {
        setSearchText(e.target.value);
        const reg = new RegExp(e.target.value, 'gi');
        const filteredData = map(newData, (record) => {
            const nameField = get(record, 'name') as string | undefined;
            const nameMatch = nameField?.match(reg);

            const studentsNameField = get(record, 'studentsName') as string | undefined;
            const studentsNameMatch = studentsNameField?.match(reg);

            const numberStudentsField = (get(record, 'numberStudents') ?? '').toString();
            const numberStudentsMatch = numberStudentsField.match(reg);

            if (!nameMatch && !studentsNameMatch && !numberStudentsMatch) {
                return null;
            }

            return record;
        }).filter((record): record is GroupsTableModel => record !== null);

        setFilteredData(filteredData);
    };

    return (
        <>
            <DataGrid
                columns={columns}
                dataSource={newData ? (searchText ? filteredData : newData) : []}
                showSort
                countRecords={countRecords}
                setPage={(numberPage) => {
                    setNumberPage(numberPage);
                }}
                toolbar={
                    <>
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            className="button"
                            onClick={() => {
                                setIsCreateModal(true);
                                showModal();
                            }}
                        >
                            <Space>
                                Add Group
                                <CaretDownOutlined />
                            </Space>
                        </Button>
                        <Search size="middle" placeholder="Search Records" suffix={<CloseCircleOutlined onClick={() => setSearchText('')} />} onPressEnter={onSearch} onChange={onSearch} style={{ width: '50%' }} value={searchText} />
                    </>
                }
            />
            <AddGroupModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} form={form} isCreate={isCreateModal}></AddGroupModal>
        </>
    );
};

export default GroupsTable;
