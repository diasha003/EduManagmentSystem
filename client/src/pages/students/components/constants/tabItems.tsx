import StudentsTable from '../StudentsTable';
import GroupsTable from '../groupsTable/GroupsTable';

interface TabItem {
    label: string;
    key: string;
    children: React.ReactElement;
}

export const items: TabItem[] = [
    {
        label: 'Students',
        key: '1',
        children: <StudentsTable />
    },
    {
        label: 'Groups',
        key: '2',
        children: <GroupsTable />
    }
];
