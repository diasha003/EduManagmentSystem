import { Button, Checkbox, Dropdown } from "antd";
import { useState } from "react";
import { useActions } from "../../../../../hooks/actions"
import { useAppSelector } from "../../../../../hooks/redux"
import "./ColumnSelector.style.css";
import { checkBoxes } from "./constants";
import { CaretDownOutlined } from "@ant-design/icons";

const ColumnSelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { updateCheckBoxes } = useActions();

  const { selectedColumns } = useAppSelector((state) => state.studentsTable);

  const options = Array.from(checkBoxes).map(([key, { displayName }]) => ({
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
          updateCheckBoxes(e.target.value);
          setOpen(true);
        }}
        onClick={() => setOpen(true)}
      >
        {displayName}
      </Checkbox>
    ),
  }));

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
