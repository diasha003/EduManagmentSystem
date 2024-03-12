import type { TableColumnsType } from "antd";

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
    payrollOverrides?: boolean
}

const columns: TableColumnsType<DataType> = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 200,
        fixed: "left",
        hidden: false,
        sorter: (a, b) => a.name.length - b.name.length,
        ellipsis: true,
    },
    {
        title: "Contact Info",
        dataIndex: "contact",
        key: "contact",
        width: 200,
        hidden: false,
    },
    {
        title: "Assigned Students",
        dataIndex: "students",
        key: "students",
        width: 100,
        hidden: false,
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
