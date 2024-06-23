import React from 'react';
import { useGetStudentQuery } from '../../../../../features/api/extensions/studentApiExtension';
import { useParams } from 'react-router-dom';
import { Student } from 'shared/models';
import { DeleteOutlined, EditOutlined, HomeOutlined, MailOutlined, MinusSquareOutlined, PhoneOutlined, PlusOutlined, SearchOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';

const AssignedTeachers: React.FC = () => {
    const { id } = useParams();
    const currentStudent: Student | undefined = useGetStudentQuery(Number(id)).currentData;

    return (
        <div
            style={{
                width: '100%',
                height: '500px',
                marginRight: '20px',
                background: 'white',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1 style={{ margin: '30px 0 0 30px' }}>Assigned Teachers</h1>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '30px' }}>
                {currentStudent?.teacherStudentAsTeacher?.map((item) => (
                    <>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div className="circleStyle" style={{ width: '30px', height: '30px', fontSize: '12px', marginRight: '15px' }}>{`${item.teacher.firstName[0] || ''}${item.teacher.lastName[0] || ''}`}</div>

                                <h3 style={{ padding: 0, margin: 0 }}>
                                    {item.teacher.firstName} {item.teacher.lastName}
                                </h3>
                                <div style={{ marginLeft: '10px' }}>
                                    <Button icon={<EditOutlined />} style={{ margin: '5px 5px 0 0' }} size="small" />
                                    <Button icon={<MinusSquareOutlined />} style={{ marginTop: '5px' }} size="small" />
                                </div>
                            </div>

                            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p>Default Lesson Category</p>
                                <div>{item.teacher.}</div>
                            </div> */}

                            {/* {item.parent.email && (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <MailOutlined style={{ margin: '0 5px 0 45px' }} />
                                    <div>{item.parent.email}</div>
                                </div>
                            )}

                           */}
                        </div>
                        <Divider></Divider>
                    </>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button icon={<PlusOutlined />} style={{ margin: '0px 4px' }}>
                    Assign Teacher
                </Button>
            </div>
        </div>
    );
};

export default AssignedTeachers;
