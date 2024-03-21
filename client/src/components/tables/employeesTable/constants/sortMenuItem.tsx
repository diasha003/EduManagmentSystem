import type { MenuProps } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import columns from "./columnsEmployeesTable";

const sortMenuItems: MenuProps["items"] = [
  { label: <a href="#">Clear Sort</a>, key: "clear" },
  { type: "divider" },
  ...columns.map(({ key, title }) => ({
    key: key as string,
    label: (
      <span>
        <>{title}</>
        <ArrowDownOutlined style={{ marginLeft: "10px" }} />
      </span>
    ),
  })),
];

export default sortMenuItems;
