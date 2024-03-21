import { Button, Checkbox, Divider, Dropdown } from "antd";
import { useState } from "react";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import "./ColumnSelector.style.css";
import { CaretDownOutlined } from "@ant-design/icons";

interface ColumnSelectorProps {
  checkBoxes: Map<string, { displayName: string }>;
  table: string;
}

const ColumnSelector = (props: ColumnSelectorProps) => {
  //console.log(props);

  const [open, setOpen] = useState<boolean>(false);
  const { updateCheckBoxesEmployeesTable, updateCheckBoxesStudentsTable } =
    useActions();

  const { selectedColumns } = useAppSelector((state) =>
    props.table === "students" ? state.studentsTable : state.employeesTable
  );

  const options = Array.from(props.checkBoxes).map(
    ([key, { displayName }]) => ({
      key,
      label: (
        <Checkbox
          value={key}
          disabled={
            (key === "all" && selectedColumns["all"]) ||
            (key === "default" && selectedColumns["default"])
          }
          checked={selectedColumns[`${key}`]}
          onChange={(e) => {
            props.table === "students"
              ? updateCheckBoxesStudentsTable(e.target.value)
              : updateCheckBoxesEmployeesTable(e.target.value);
            setOpen(true);
          }}
          onClick={() => setOpen(true)}
        >
          {displayName}
        </Checkbox>
      ),
      type: key === "divider" ? "divider" : "checkbox",
    })
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
      }}
      menu={{
        items: options,
      }}
      trigger={["click"]}
    >
      <Button onClick={() => setOpen(true)}>
        Columns <CaretDownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ColumnSelector;
