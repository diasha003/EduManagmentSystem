import { CalendarOutlined, CaretDownOutlined, LineChartOutlined, PayCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Card, Divider, Dropdown, Space } from 'antd';

import React, { useState } from 'react';
import './personDetails.style.css'          ;
import { useAppSelector } from '../../hooks/redux';
import CustomCard from '../../components/card/CustomCard';

const PersonDetails: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <>
            <div
                style={{
                    margin: '5px 15px',
                    padding: '10px 10px',
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '18px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        background: 'white',
                        margin: '16px 0px'
                    }}
                >
                    <Card title={<div className="circleStyle">sdfdfg</div>} bordered={true} style={{ width: 200, height: 200 }}>
                        <div className="cardContent">
                            <div style={{ fontWeight: 600, color: '#1b2831' }}>dfgdfg</div>
                            <div style={{ textAlign: 'center', color: '#5f7781' }}>dfgdfg</div>
                        </div>
                    </Card>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '16px 110px'
                    }}
                >
                    info plan 2
                </div>
            </div>
        </>
    );
};

export default PersonDetails;
