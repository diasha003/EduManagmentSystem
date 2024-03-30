import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const studentAddOptions: MenuProps["items"] = [
  {
    icon: <PlusOutlined />,
    key: 0,
    label: "New Student",
  },
  {
    icon: <CloudUploadOutlined />,
    key: 1,
    label: "Import Students",
  },
];

export default studentAddOptions;
