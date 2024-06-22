import { Badge, Card, Space, Tabs } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { itemsProfile } from '../constants/tabItems';
import './ProfileStudent.style.css';
import { Student } from 'shared/models';
import stc from 'string-to-color';
import { useGetStudentQuery } from '../../../../features/api/extensions/studentApiExtension';
import { useGetAllUserQuery } from '../../../../features/api/extensions/userApiExtension';

// export interface StudentModel {
//     key: number;
//     email: string;
//     address?: string;
//     name: string;
//     contact?: string;
//     family?: string;
//     note?: string;
//     lastLesson?: Date;
//     nextLesson?: Date;
//     avgAttendance?: number;
//     birthday?: string;
//     age?: number;
//     gender?: string;
//     education?: string;
//     lastLog?: Date;
//     studentSince?: string;
//     operation?: React.ReactElement;
//     status: string;
//     familyStudentsAsStudent?: { parent: User; parentId: number; studentId: number };
//     groupStudents?: { group: Group }[];
//     teacherStudentAsTeacher?: { teacher: User }[];
// }

const ProfileStudent: React.FC = () => {
    const { id } = useParams();
    const currentStudent: Student | undefined = useGetStudentQuery(Number(id)).currentData;

   

   
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '15px 20px'
                }}
            >
                <Card title={<div className="circleStyle"> {`${currentStudent?.firstName[0] || ''}${currentStudent?.lastName[0] || ''}`}</div>} bordered={true} style={{ width: 400, height: 400 }}>
                    <div className="cardContent">
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                            <Link to="/" style={{ fontWeight: 500, color: 'blue', marginBottom: 0, cursor: 'pointer' }}>
                                {currentStudent?.firstName} {currentStudent?.lastName}
                            </Link>
                            <Space>
                                <Badge count={currentStudent?.studentInfo?.status && currentStudent?.studentInfo?.status.charAt(0).toUpperCase() + currentStudent?.studentInfo?.status.toLowerCase().slice(1)} color={currentStudent?.studentInfo?.status && stc(currentStudent?.studentInfo?.status.charAt(0).toUpperCase() + currentStudent?.studentInfo?.status.toLowerCase().slice(1) + ' light6')} />
                            </Space>
                        </div>
                    </div>
                </Card>
            </div>
            <Tabs defaultActiveKey="1" size="middle" className="tabs" items={itemsProfile} />;
        </div>
    );
};

export default ProfileStudent;
