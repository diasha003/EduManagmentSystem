import React from 'react';
import { useGetStudentQuery } from '../../../../../features/api/extensions/studentApiExtension';
import { useParams } from 'react-router-dom';
import { Student } from 'shared/models';
import { DeleteOutlined, EditOutlined, HomeOutlined, MailOutlined, PhoneOutlined, PlusOutlined, SearchOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';

const FamilyContact: React.FC = () => {
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
            <div style={{ display: 'flex', flexDirection: 'column', margin: '30px' }}>
                {currentStudent?.familyStudentsAsStudent?.map((item) => (
                    <>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ padding: 0, margin: 0 }}>
                                    {item.parent.firstName} {item.parent.lastName}
                                </h3>
                                <div style={{ marginLeft: '10px' }}>
                                    <Button icon={<EditOutlined />} style={{ margin: '5px 5px 0 0' }} size="small" />
                                    <Button icon={<DeleteOutlined />} style={{ marginTop: '5px' }} size="small" />
                                </div>
                            </div>

                            {item.parent.email && (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <MailOutlined style={{ marginRight: '5px' }} />
                                    <div>{item.parent.email}</div>
                                </div>
                            )}

                            {item.parent.address && item.parent.address.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <HomeOutlined style={{ marginRight: '5px' }} />
                                    <div>{item.parent.address}</div>
                                </div>
                            )}

                            {item.parent.phoneNumber && item.parent.phoneNumber.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <PhoneOutlined style={{ marginRight: '5px' }} />
                                    <div>{item.parent.phoneNumber}</div>
                                </div>
                            )}
                        </div>
                        <Divider></Divider>
                    </>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button icon={<SwapOutlined />}>Change Family</Button>
                <Button icon={<PlusOutlined />} style={{ margin: '0px 4px' }}>
                    Add Another Contact
                </Button>
            </div>
        </div>
    );
};

export default FamilyContact;
