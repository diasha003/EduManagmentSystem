import React from 'react';
import { Tabs } from 'antd';

import { items } from './components/constants/tabItems';
import './InfoStudents.style.css';

const InfoStudents: React.FC = () => {
    return <Tabs defaultActiveKey="1" size="middle" className="tabs" items={items} />;
};

export default InfoStudents;
