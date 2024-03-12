import { CaretDownOutlined, DownOutlined, MailOutlined, PlusOutlined, SearchOutlined, SettingOutlined, SortAscendingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table, TableProps, Typography } from "antd";
import "./EmployeesTable.style.css"
import { useNavigate } from "react-router-dom";
import sortMenuItems from "./constants/sortMenuItem";
import ColumnSelector from "../columnSelector/ColumnSelector";
import { checkBoxes } from "./constants/columnSelectorEmployeesTable";
import columns, { DataType } from "./constants/columnsEmployeesTable";
import { useAppSelector } from "../../../hooks/redux";
import { useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";


type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;


const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
    },
    {
        key: '2',
        name: 'Aim Green',
    },
];



const EmployeesTable: React.FC = () => {

    const nav = useNavigate();

    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const { selectedColumns } = useAppSelector((state) => state.employeesTable);


    let newColumns = columns.map((item) => ({
        ...item,
        hidden: !selectedColumns[`${item.key}`],
        sortOrder: sortedInfo.columnKey === item.key ? sortedInfo.order : null,
    }));

    let newSortMenuItems: ItemType[] | undefined= columns.map((item, index) => ({
        key: index,
        label: item.title,
    }));



    const items: MenuProps['items'] = [
        {

            key: '1',
            icon: <PlusOutlined />,
            label: 'New Teacher',
            onClick: (e) => {
                nav("/employees/add");
            }
        },
        {

            key: '2',
            icon: <PlusOutlined />,
            label: 'New Staff Member',
            onClick: (e) => {
                nav("/employees/add");
            }
        },

    ];

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        //setSortedInfo(sorter as Sorts);
    };


    return (
        <div className="controlContainer">
            <div className="buttonContainer">
                <div>
                    <Dropdown menu={{ items }} trigger={["click"]}>
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            className="button"

                        >

                            Add new
                            <CaretDownOutlined />

                        </Button>
                    </Dropdown>


                    <Button type="default" className="button" icon={<MailOutlined />}>
                        Messaging
                    </Button>
                    <Button type="default" className="button" icon={<SettingOutlined />} >
                        Options
                    </Button>
                </div>
                <div>

                    <ColumnSelector checkBoxes={checkBoxes} table="employees"></ColumnSelector>

                    <Dropdown menu={{ items: sortMenuItems }} trigger={["click"]}>
                        <Button icon={<SortAscendingOutlined />} className="button">
                            <Space>
                                Sort
                                <CaretDownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>

                    <Dropdown menu={{ items: newSortMenuItems }} trigger={["click"]}>
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
                dataSource={data}
                onChange={handleChange}
                scroll={{ x: 1500, y: 300 }}
                style={{ zIndex: 1 }}
            />


        </div>)
}


export default EmployeesTable;


