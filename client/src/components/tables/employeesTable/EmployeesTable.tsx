import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CaretDownOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table, TableProps } from "antd";
import "./EmployeesTable.style.css";
import { useNavigate } from "react-router-dom";
import ColumnSelector from "../columnSelector/ColumnSelector";
import { checkBoxes } from "./constants/columnSelectorEmployeesTable";
import { DataType } from "./constants/columnsEmployeesTable";
import { useAppSelector } from "../../../hooks/redux";
import { useActions } from "../../../hooks/actions";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
  },
  {
    key: "2",
    name: "Aim Green",
  },
];

const EmployeesTable: React.FC = () => {
  const nav = useNavigate();

  const { columnSortState } = useAppSelector((state) => state.employeesTable);

  const { updateColumnSortEmployeesTable } = useActions();

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <PlusOutlined />,
      label: "New Teacher",
      onClick: (e) => {
        nav("/employees/add");
      },
    },
    {
      key: "2",
      icon: <PlusOutlined />,
      label: "New Staff Member",
      onClick: (e) => {
        nav("/employees/add");
      },
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    if (Array.isArray(sorter)) {
      return;
    }
    updateColumnSortEmployeesTable(sorter as Sorts);
  };

  let sortMenuItems: MenuProps["items"] = [
    {
      label: <a href="#">Clear Sort</a>,
      key: "clear",
    },
    { type: "divider" },
    ...columnSortState.map(({ key, title, sortOrder }) => ({
      key: key as string,
      label: (
        <span>
          <>{title}</>
          {sortOrder === "descend" ? (
            <ArrowDownOutlined className="stateSortIcon" />
          ) : (
            <ArrowUpOutlined className="stateSortIcon" />
          )}
        </span>
      ),
    })),
  ];

  return (
    <div className="controlContainer">
      <div className="buttonContainer">
        <div>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button icon={<PlusOutlined />} type="primary" className="button">
              Add new
              <CaretDownOutlined />
            </Button>
          </Dropdown>

          <Button type="default" className="button" icon={<MailOutlined />}>
            Messaging
          </Button>
          <Button type="default" className="button" icon={<SettingOutlined />}>
            Options
          </Button>
        </div>
        <div>
          <ColumnSelector
            checkBoxes={checkBoxes}
            table="employees"
          ></ColumnSelector>

          <Dropdown
            menu={{
              items: sortMenuItems,
              onClick: (e) => {
                updateColumnSortEmployeesTable({
                  columnKey: e.key,
                });
              },
            }}
            trigger={["click"]}
          >
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
        columns={columnSortState}
        dataSource={data}
        onChange={handleChange}
        scroll={{ x: 1500, y: 300 }}
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default EmployeesTable;
