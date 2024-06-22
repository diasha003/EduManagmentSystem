import React from 'react';

export interface GroupsTableModel {
    key: number;
    name: string;
    numberStudents: number;
    studentsName?: string;
    operation?: React.ReactElement;
    studentsId?: number[];
}

const ProfileStudent: React.FC = () => {
    return <>student</>;
};

export default ProfileStudent;
