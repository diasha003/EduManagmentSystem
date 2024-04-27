import { Button, Dropdown, MenuProps, Space } from 'antd';
import { CaretDownOutlined, MailOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { DataGrid, DataGridColumn } from '../../../components/DataGrid/DataGrid';

export interface EmployeeModel {
    key: string;
    name: string;
    contact?: string;
    students?: Array<string>;
    payrollBalance?: number;
    defaultPrice?: number;
    defaultLessonCategory?: string;
    defaultDuration?: number;
    payRate?: number;
    calendarColor?: string;
    payrollOverrides?: boolean;
}

const columns: DataGridColumn<EmployeeModel>[] = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        width: 200,
        hidden: false,
        sorter: (a: EmployeeModel, b: EmployeeModel) => a.name.length - b.name.length
    },
    {
        key: 'contact',
        title: 'Contact Info',
        dataIndex: 'contact',
        width: 200,
        hidden: false,
        sorter: (a: EmployeeModel, b: EmployeeModel) => (a.contact?.length ?? 0) - (b.contact?.length ?? 0)
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
        hidden: false
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

const data: EmployeeModel[] = [
    {
        key: '1',
        name: 'John Brown'
    },
    {
        key: '2',
        name: 'Aim Green'
    }
];

const EmployeesTable: React.FC = () => {
    const nav = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <PlusOutlined />,
            label: 'New Teacher',
            onClick: (e) => {
                nav('/employees/add');
            }
        },
        {
            key: '2',
            icon: <PlusOutlined />,
            label: 'New Staff Member',
            onClick: (e) => {
                nav('/employees/add');
            }
        }
    ];

    return (
        <DataGrid
            columns={columns}
            dataSource={data}
            showColumnsSelector
            showSort
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
