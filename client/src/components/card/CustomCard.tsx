import { Card } from 'antd';
import './CustomCard.style.css';
import React from 'react';

import { useAppSelector } from '../../hooks/redux';

interface ICardComponent {
    icon?: React.ReactNode;
    count?: number;
    description?: string;
}

const CustomCard: React.FC<ICardComponent> = (props) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '16px 0px'
            }}
        >
            <Card title={<div className="circleStyle">sdfdfg</div>} bordered={true}>
                <div className="cardContent">
                    <div style={{ fontWeight: 600, color: '#1b2831' }}>dfgdfg</div>
                    <div style={{ textAlign: 'center', color: '#5f7781' }}>dfgdfg</div>
                </div>
            </Card>
        </div>
    );
};

export default CustomCard;
