import { Badge, Button, Card, Space, Tabs } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { itemsProfile } from '../constants/tabItems';
import './ProfileStudent.style.css';
import { Group, Student, User } from 'shared/models';
import stc from 'string-to-color';
import { useGetStudentQuery } from '../../../../features/api/extensions/studentApiExtension';
import { useGetAllUserQuery } from '../../../../features/api/extensions/userApiExtension';
import { DeleteOutlined, EditOutlined, HomeOutlined, MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import { current } from '@reduxjs/toolkit';

export interface StudentModel {
    key: number;
    email: string;
    address?: string;
    name: string;
    contact?: string;
    family?: string;
    note?: string;
    lastLesson?: Date;
    nextLesson?: Date;
    avgAttendance?: number;
    birthday?: string;
    age?: number;
    gender?: string;
    education?: string;
    lastLog?: Date;
    studentSince?: string;
    operation?: React.ReactElement;
    status: string;
    familyStudentsAsStudent?: { parent: User; parentId: number; studentId: number };
    groupStudents?: { group: Group }[];
    teacherStudentAsTeacher?: { teacher: User }[];
}

const ProfileStudent: React.FC = () => {
    const { id } = useParams();
    const currentStudent: Student | undefined = useGetStudentQuery(Number(id)).currentData;

    console.log (currentStudent)

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '15px 20px'
                }}
            >
                <Card
                    title={
                        <div style={{ position: 'relative', width: '100%', textAlign: 'center', margin: '10px 0px' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <Button icon={<EditOutlined />} style={{ margin: '5px 5px 0 0' }} />
                                <Button icon={<DeleteOutlined />} style={{ marginTop: '5px' }} />
                            </div>
                            <div className="circleStyle" style={{ margin: 'auto' }}>
                                {`${currentStudent?.firstName[0] || ''}${currentStudent?.lastName[0] || ''}`}
                            </div>
                        </div>
                    }
                    bordered={true}
                    style={{ width: 400, height: 400 }}
                >
                    <div className="cardContent">
                        <h2>
                            {currentStudent?.firstName} {currentStudent?.lastName}
                        </h2>

                        <Badge count={currentStudent?.studentInfo?.status && currentStudent?.studentInfo?.status.charAt(0).toUpperCase() + currentStudent?.studentInfo?.status.toLowerCase().slice(1)} color={currentStudent?.studentInfo?.status && stc(currentStudent?.studentInfo?.status.charAt(0).toUpperCase() + currentStudent?.studentInfo?.status.toLowerCase().slice(1) + ' light6')} />

                        <Link to="" style={{ marginTop: '5px' }}>
                            View Family Account
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {currentStudent?.email && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <MailOutlined style={{ marginRight: '5px' }} />
                                <>{currentStudent?.email}</>
                            </div>
                        )}
                        {currentStudent?.address && currentStudent?.address.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <HomeOutlined style={{ marginRight: '5px' }} />
                                <>{currentStudent?.address}</>
                            </div>
                        )}
                        {currentStudent?.phoneNumber && currentStudent?.phoneNumber.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <PhoneOutlined style={{ marginRight: '5px' }} />
                                <>{currentStudent?.phoneNumber}</>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
            <Tabs defaultActiveKey="1" size="middle" style={{width: "100%"}} items={itemsProfile} />;
        </div>
    );
};

export default ProfileStudent;
