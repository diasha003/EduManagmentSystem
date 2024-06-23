import StudentsTable from '../StudentsTable';
import GroupsTable from '../groupsTable/GroupsTable';
import AssignedTeachers from '../profile/assignedTeachers/AssignedTeachers';
import FamilyContact from '../profile/familyContact/FamilyContact';

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
        label: 'Family Contacts',
        key: '2',
        children: <FamilyContact />
    },
    {
        label: 'Assigned Teachers',
        key: '3',
        children: <AssignedTeachers/>
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
