import React, { useState } from "react";
import { Layout, Menu } from "antd";

import "./NavBar.style.css";

import { useNavigate } from "react-router-dom";
import items from "./constants/index";

const { Sider } = Layout;

const NavBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const nav = useNavigate();

  const handleMouseOver = () => {
    setCollapsed(false);
  };

  const handleMouseOut = () => {
    setCollapsed(true);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="logo">LOGO</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
        onClick={(item) => {
          nav(`${item?.key}`);
        }}
      />
    </Sider>
  );
};

export default NavBar;
