import type { TableColumnsType } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

export interface DataType {
  key: string;
  name: string;
  contact?: string;
  students?: Array<string>;
  payrollBalance?: number;
  defaultPrice?: number;
  defaultLessonCategory?: string;
  defaultDuration?: number;
  payRate?: number;
  calendarColor?: string;
  payrollOverrides?: boolean;
}

let columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    //fixed: "left",
    hidden: false,
    sorter: (a, b) => a.name.length - b.name.length,
    sortOrder: null,
    //sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Contact Info",
    dataIndex: "contact",
    key: "contact",
    width: 200,
    hidden: false,
    sorter: (a, b) => (a.contact?.length ?? 0) - (b.contact?.length ?? 0),
    sortOrder: null,
  },
  {
    title: "Assigned Students",
    dataIndex: "students",
    key: "students",
    width: 100,
    hidden: false,
    sorter: true,
  },
  {
    title: "Payroll Balance",
    dataIndex: "payrollBalance",
    key: "payrollBalance",
    width: 100,
    hidden: false,
  },
  {
    title: "Default Price",
    dataIndex: "defaultPrice",
    key: "defaultPrice",
    width: 100,
    hidden: true,
  },
  {
    title: "Default Lesson Category",
    dataIndex: "defaultLessonCategory",
    key: "defaultLessonCategory",
    width: 150,
    hidden: false,
  },
  {
    title: "Default Duration",
    dataIndex: "defaultDuration",
    key: "defaultDuration",
    width: 100,
    hidden: false,
  },
  {
    title: "Pay Rate",
    dataIndex: "payRate",
    key: "payRate",
    width: 100,
    hidden: false,
  },
  {
    title: "Calendar Color",
    dataIndex: "calendarColor",
    key: "calendarColor",
    width: 150,
    hidden: true,
  },
  {
    title: "Payroll Overrides",
    dataIndex: "payrollOverrides",
    key: "payrollOverrides",
    width: 100,
    hidden: true,
  },
];

export default columns;

// title: function (titleProps) {
//     //console.log("titleProps ", titleProps);
//     const sortedColumn = titleProps.sortColumns?.find(
//       ({ column }) => column.key === "name"
//     );

//     return (
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         Name
//         {sortedColumn?.order === "ascend" ? (
//           <ArrowDownOutlined />
//         ) : (
//           <ArrowUpOutlined />
//         )}
//       </div>
//     );
//   },
