import { CaretDownOutlined, DownOutlined, MailOutlined, PlusOutlined, SearchOutlined, SettingOutlined, SortAscendingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table, Typography } from "antd";
import "./EmployeesTable.style.css"
import { useNavigate } from "react-router-dom";
import sortMenuItems from "./constants/sortMenuItem";
import ColumnSelector from "../columnSelector/ColumnSelector";
import { checkBoxes } from "./constants/columnSelectorEmployeesTable";
import columns from "./constants/columnsEmployeesTable";
import { useAppSelector } from "../../../hooks/redux";

const EmployeesTable: React.FC = () => {

    const nav = useNavigate();

    const { selectedColumns } = useAppSelector((state) => state.employeesTable);
    
  
    let newColumns = columns.map((item) => ({
      ...item,
      hidden: !selectedColumns[`${item.key}`],
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


        </div>)
}


export default EmployeesTable;


