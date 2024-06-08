import React from 'react';
import { DataGrid, DataGridColumn } from '../../../../components/DataGrid/DataGrid';
import { Button, Dropdown, Space } from 'antd';
import { CaretDownOutlined, PlusOutlined, ReloadOutlined, TableOutlined } from '@ant-design/icons';

export interface StudentTableModel {
    key: number;
    email: string;
    address?: string;
    name: string;
    contact?: string;
    students?: string[];
    balance: number;
    //autoPay
    //autoInvoiceSetting
    //lastInvoiceDate
    //lastPaymentDate
  
}

const FamilyAccountsTable: React.FC = () => {
    const columns: DataGridColumn<StudentTableModel>[] = [
        {
            title: 'Family',
            dataIndex: 'family',
            key: 'family',
            width: 200,
            fixed: 'left',
            hidden: false
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            width: 200,
            hidden: true
        },
        {
            title: 'Family Contact',
            dataIndex: 'familyContact',
            key: 'familyContact',
            width: 150,
            hidden: false
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            width: 150,
            hidden: false
        },
        {
            title: 'Auto Pay',
            dataIndex: 'autoPay',
            key: 'autoPay',
            width: 150,
            hidden: true
        },
        {
            title: 'Auto-Invoice Settings',
            dataIndex: 'autoInvoiceSettings',
            key: 'autoInvoiceSettings',
            width: 150,
            hidden: true
        },
        {
            title: 'Last Invoice Date',
            dataIndex: 'lastInvoiceDate',
            key: 'lastInvoiceDate',
            width: 150,
            hidden: true
        },
        {
            title: 'Last Payment Date',
            dataIndex: 'lastPaymentDate',
            key: 'lastPaymentDate',
            width: 150,
            hidden: true
        }
    ];

    return (
        <DataGrid
            columns={columns}
            dataSource={[]}
            showColumnsSelector
            showSort
            toolbar={
                <Space>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className="button"
                        onClick={() => {
                            //nav('/students/add');
                        }}
                    >
                        Add Transaction
                    </Button>

                    <Button type="default" className="button" icon={<TableOutlined />}>
                        Charge Categories
                    </Button>

                    <Dropdown menu={{ items: [] }} trigger={['click']}>
                        <Button
                            icon={<ReloadOutlined />}
                            type="default"
                            className="button"
                            onClick={() => {
                                //nav('/students/add');
                            }}
                        >
                            <Space>
                                Auto-Invoicing
                                <CaretDownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Space>
            }
        />
    );
};

export default FamilyAccountsTable;
