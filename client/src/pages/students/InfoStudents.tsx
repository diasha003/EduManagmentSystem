import React from "react";
import { items } from "./components/constants/tabItems";
import "./InfoStudents.style.css";
import { Tabs } from "antd";

const InfoStudents: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1" size="middle" className="tabs" items={items} />
  );
};

export default InfoStudents;
