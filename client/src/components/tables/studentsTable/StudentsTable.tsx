import React, { useState } from "react";
import { Button, Table, Space, Dropdown } from "antd";
import {
  SearchOutlined,
  CaretDownOutlined,
  SortAscendingOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./StudentsTable.style.css";
import columns from "./constants/columnsStudentsTable";
import sortMenuItems from "./constants/sortMenuItems";
import { useAppSelector } from "../../../hooks/redux";
import ColumnSelector from "../columnSelector/ColumnSelector"
import studentAddOptions from "./constants/studentAddOptions";
import { useNavigate } from "react-router-dom";
import { checkBoxes } from "./constants/columnSelectorStudentsTable";

const StudentsTable: React.FC = () => {
  const { selectedColumns } = useAppSelector((state) => state.studentsTable);
  const nav = useNavigate();

  let newColumns = columns.map((item) => ({
    ...item,
    hidden: !selectedColumns[`${item.key}`],
  }));

  return (
    <div className="controlContainer">
      <div className="buttonContainer">
        <div>
          <Dropdown menu={{ items: studentAddOptions }} trigger={["click"]}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              className="button"
              onClick={() => {
                nav("/students/add");
              }}
            >
              <Space>
                Add new
                <CaretDownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Button type="primary" className="button">
            Messaging
          </Button>
          <Button type="primary" className="button">
            Options
          </Button>
        </div>
        <div>
          <ColumnSelector checkBoxes={checkBoxes} table="students"></ColumnSelector>

          <Dropdown menu={{ items: sortMenuItems }} trigger={["click"]}>
            <Button icon={<SortAscendingOutlined />} className="button">
              <Space>
                Sort
                <CaretDownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Button icon={<SearchOutlined />} className="button">
            Search
          </Button>
        </div>
      </div>

      <Table
        columns={newColumns}
        //dataSource={data}
        scroll={{ x: 1500, y: 300 }}
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default StudentsTable;
