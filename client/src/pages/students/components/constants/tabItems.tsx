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

export const itemsProfile: TabItem[] = [
    {
        label: 'Student Overview',
        key: '1',
        children: <>Student Overview</>
    },
    {
        label: 'Family Contacts',
        key: '2',
        children: <>Family Contacts</>
    },
    {
        label: 'Assigned Teachers',
        key: '3',
        children: <>Assigned Teachers</>
    },
    {
        label: 'Attendance',
        key: '4',
        children: <>Attendance</>
    },
    {
        label: 'Student Portal',
        key: '5',
        children: <>Student Portal</>
    }
];
