import { Avatar, Badge, Button, Col, Dropdown, MenuProps, Row, Space } from 'antd';
import { CaretDownOutlined, HomeOutlined, MailOutlined, PhoneOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import { DataGrid, DataGridColumn } from '../../../components/DataGrid/DataGrid';
import { useAppSelector } from '../../../hooks/redux';
import { useGetAllCenterNameQuery, useGetAllEmployeesQuery } from '../../../features/api/extensions/employeesApiExtension';

import { IEmployee } from '../../../types/employee';
import stc from 'string-to-color';

export interface EmployeeModel {
    key: number;
    name: string;
    contact?: string;
    email: string;
    address?: string;
    students?: Array<string>;
    payrollBalance?: number;
    defaultPrice?: number;
    defaultLessonCategory?: string;
    defaultDuration?: number;
    payRate?: string;
    calendarColor?: string;
    payrollOverrides?: boolean;
    roles: string[];
    isActive: string;
}

const columns: DataGridColumn<EmployeeModel>[] = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        width: 150,
        hidden: false,
        sorter: (a: EmployeeModel, b: EmployeeModel) => a.name.length - b.name.length,
        render: (value, record) => {
            return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
                            {record.name
                                .split(' ')
                                .map((part) => part[0])
                                .join('')}
                        </Avatar>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                        <Link to="" style={{ fontWeight: 500, color: 'blue', marginBottom: 0, cursor: 'pointer' }}>
                            {record.name}
                        </Link>
                        <Space>
                            <Badge count={record.isActive} color={stc(record.isActive + ' light6')} />

                            {record.roles.map((role) => {
                                const state = role.charAt(0) + role.toLocaleLowerCase().slice(1);
                                const color = stc(state + ' light6');
                                //console.log(color);
                                return (
                                    <>
                                        <Badge count={state} color={color} />
                                    </>
                                );
                            })}
                        </Space>
                    </div>
                </div>
            );
        }
    },
    {
        key: 'contact',
        title: 'Contact Info',
        dataIndex: 'contact',
        width: 100,
        hidden: false,
        sorter: (a: EmployeeModel, b: EmployeeModel) => (a.contact?.length ?? 0) - (b.contact?.length ?? 0),
        render: (value, record) => {
            return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {record.email && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <MailOutlined style={{ marginRight: '5px' }} />
                            <>{record.email}</>
                        </div>
                    )}
                    {record.address && record.address.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <HomeOutlined style={{ marginRight: '5px' }} />
                            <>{record.address}</>
                        </div>
                    )}
                    {record.contact && record.contact.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <PhoneOutlined style={{ marginRight: '5px' }} />
                            <>{record.contact}</>
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        key: 'students',
        title: 'Assigned Students',
        dataIndex: 'students',
        width: 100,
        hidden: false
    },
    {
        key: 'payrollBalance',
        title: 'Payroll Balance',
        dataIndex: 'payrollBalance',
        width: 100,
        hidden: false
    },
    {
        key: 'defaultPrice',
        title: 'Default Price',
        dataIndex: 'defaultPrice',
        width: 100,
        hidden: true
    },
    {
        key: 'defaultLessonCategory',
        title: 'Default Lesson Category',
        dataIndex: 'defaultLessonCategory',
        width: 150,
        hidden: false
    },
    {
        key: 'defaultDuration',
        title: 'Default Duration',
        dataIndex: 'defaultDuration',
        width: 100,
        hidden: false
    },
    {
        key: 'payRate',
        title: 'Pay Rate',
        dataIndex: 'payRate',
        width: 100,
        hidden: false,
        render: (value, record) => {
            return <>{record.payRate}</>;
        }
    },
    {
        key: 'calendarColor',
        title: 'Calendar Color',
        dataIndex: 'calendarColor',
        width: 150,
        hidden: true
    },
    {
        key: 'payrollOverrides',
        title: 'Payroll Overrides',
        dataIndex: 'payrollOverrides',
        width: 100,
        hidden: true
    }
];

const EmployeesTable: React.FC = () => {
    const nav = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const allCenterName = useGetAllCenterNameQuery().currentData;
    const data: IEmployee[] | undefined = useGetAllEmployeesQuery().currentData;

    const renderPayRate = (employeeInfo?: {
        payroll?: {
            payrollType: string;
            payRate: number | null;
            makeUpCredits: string | boolean;
        };
    }): string => {
        if (employeeInfo?.payroll) {
            if (employeeInfo.payroll.payRate) {
                if (employeeInfo.payroll.payrollType === 'hourlyRate') {
                    return `$${employeeInfo?.payroll.payRate}/hour`;
                } else {
                    return `${employeeInfo?.payroll.payRate}%`;
                }
            } else {
                return '-';
            }
        }

        return '';
    };

    const newData: EmployeeModel[] | undefined = data?.map((item, key) => ({
        key,
        name: `${item.firstName} ${item.lastName}`,
        contact: item.phoneNumber,
        email: item.email,
        address: item.address,
        payRate: renderPayRate(item.employeeInfo),
        roles: item.roles,
        isActive: item.isActive ? 'Active' : 'InActive'
    }));

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <PlusOutlined />,
            label: 'New Teacher',
            onClick: (e) => {
                nav('/employees/add/teacher');
            }
        },
        {
            key: '2',
            icon: <PlusOutlined />,
            label: 'New Staff Member',
            onClick: (e) => {
                nav('/employees/add/staff');
            }
        }
    ];

    return (
        <DataGrid
            columns={columns}
            dataSource={newData ? newData : []}
            allCenterName={allCenterName}
            showColumnsSelector
            showSort
            showSelectCenterName={user?.roles.includes('ADMIN') ? true : false}
            toolbar={
                <Space>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button icon={<PlusOutlined />} type="primary" className="button">
                            Add new
                            <CaretDownOutlined />
                        </Button>
                    </Dropdown>

                    <Button type="default" className="button" icon={<MailOutlined />}>
                        Messaging
                    </Button>
                    <Button type="default" className="button" icon={<SettingOutlined />}>
                        Options
                    </Button>
                </Space>
            }
        />
    );
};

export default EmployeesTable;
