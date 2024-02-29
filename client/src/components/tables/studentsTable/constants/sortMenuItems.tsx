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
    label: "Age",
    key: "1",
    icon: <ArrowDownOutlined />,
  },
  {
    label: "Birthday",
    key: "2",
  },
  {
    label: "Gender",
    key: "3",
  },
  {
    label: "Last Lesson",
    key: "4",
  },
  {
    label: "Last Login",
    key: "5",
  },
  {
    label: "Next Lesson",
    key: "6",
  },
  {
    label: "Student",
    key: "7",
  },
  {
    label: "Student Since",
    key: "8",
  },
];

export default sortMenuItems;
