import React from 'react';
import { DataGrid, DataGridColumn } from '../../../../components/DataGrid/DataGrid';

export interface InvoiceTransactionModel {
    key: number;
    family: string[];
    typeTransaction: string;
    description?: string;
    status: string;
    date: string;
}

const InvoiceTransactionTable: React.FC = () => {
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
            width: 150,
            hidden: false
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction',
            key: 'transaction',
            width: 100,
            hidden: false
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 150,
            hidden: false
        }
    ];

    return <DataGrid columns={columns} dataSource={[]} />;
};

export default InvoiceTransactionTable;
