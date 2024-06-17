import { Tabs } from 'antd';
import FamilyAccountsTable from './components/familyAccounts/FamilyAccountsTable';
import InvoiceTransactionTable from './components/invoices_transactions/InvoiceTransactionTable';

interface TabItem {
    label: string;
    key: string;
    children: React.ReactElement;
}

export const items: TabItem[] = [
    {
        label: 'Family Accounts',
        key: '1',
        children: <FamilyAccountsTable />
    },
    {
        label: 'Invoices & Transactions',
        key: '2',
        children: <InvoiceTransactionTable />
    }
];

const FamiliesInvoicesInfo: React.FC = () => {
    return <Tabs defaultActiveKey="1" size="middle" className="tabs" items={items} />;
};

export default FamiliesInvoicesInfo;
