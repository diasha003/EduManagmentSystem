import React from 'react';
import { DataGrid, DataGridColumn } from '../../../../components/DataGrid/DataGrid';
import { useGetAllTransactionQuery } from '../../../../features/api/extensions/paymentApiExtension';
import { EventPaymentDto } from 'shared/models';
import { Button, Flex, Tag } from 'antd';
import Decimal from 'decimal.js';
import { DollarOutlined, DownloadOutlined, PayCircleOutlined } from '@ant-design/icons';

export interface InvoiceTransactionModel {
    key: number;
    family: string;
    transaction: string;
    description?: string;
    status: string;
    date: string;
    amount: number;
}

const InvoiceTransactionTable: React.FC = () => {
    const data: EventPaymentDto[] | undefined = useGetAllTransactionQuery().currentData;

    console.log(data);

    const newData: InvoiceTransactionModel[] | undefined = data?.map((item) => {
        return {
            key: item.id,
            family: item.student.familyStudentsAsParent[0].parent.firstName + ' ' + item.student.familyStudentsAsParent[0].parent.lastName,
            date: item.timestamp.toDateString(),
            status: item.status,
            transaction: item.type,
            amount: item.amount,
            description: item.description
        };
    });

    const columns: DataGridColumn<InvoiceTransactionModel>[] = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 50,
            fixed: 'left',
            hidden: false
        },
        {
            title: 'Family',
            dataIndex: 'family',
            key: 'family',
            width: 100,
            hidden: false
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction',
            key: 'transaction',
            width: 100,
            hidden: false,
            render: (value, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Tag color={record.transaction === 'charge' ? 'red' : 'green'} style={{ display: 'flex', alignItems: 'center' }}>
                            {record.transaction} {record.amount.toString()}
                        </Tag>
                        {record.transaction === 'charge' && <Button icon={<DollarOutlined />} size="small" />}
                    </div>
                );
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            hidden: false,
            render: (value, record) => {
                return <Tag color={record.status === 'pending' ? 'processing' : record.status === 'paid' ? 'green' : 'stop'}>{record.status}</Tag>;
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 150,
            hidden: false
        }
    ];

    return <DataGrid columns={columns} dataSource={newData ? newData : []} />;
};

export default InvoiceTransactionTable;
