import { Tabs } from 'antd';

interface TabItem {
    label: string;
    key: string;
    children: React.ReactElement;
}

export const items: TabItem[] = [
    {
        label: 'Family Accounts',
        key: '1',
        children: <>Family Accounts</>
    },
    {
        label: 'Invoices',
        key: '2',
        children: <>Invoices</>
    },
    {
        label: 'Transactions',
        key: '3',
        children: <>Transactions</>
    }
];

const FamiliesInvoicesInfo: React.FC = () => {
    return <Tabs defaultActiveKey="1" size="middle" className="tabs" items={items} />;
};

export default FamiliesInvoicesInfo;
