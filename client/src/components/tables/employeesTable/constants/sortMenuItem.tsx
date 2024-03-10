import type { MenuProps } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

const sortMenuItems: MenuProps["items"] = [
  {
    label: <a href="">Clear Sort</a>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "Assigned Students",
    key: "1",
    icon: <ArrowDownOutlined />,
  },
  {
    label: "Contact Info",
    key: "2",
  },
  {
    label: "Default Duration",
    key: "3",
  },
  {
    label: "Default Lesson Category",
    key: "4",
  },
  {
    label: "Name",
    key: "5",
  },
  {
    label: "Payroll Balance",
    key: "6",
  },
];

export default sortMenuItems;