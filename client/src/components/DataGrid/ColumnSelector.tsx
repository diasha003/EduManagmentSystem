import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { DataGridExtendedColumn } from "./DataGrid";

export type ColumnSelectorProps<T> = {
  columns: DataGridExtendedColumn<T>[];
  onSwitchColumn?: (key: string) => void;
};

type ColumnSelectorItem = {
  displayName?: string;
  isSelected?: boolean;
};

export function ColumnSelector<T>({
  columns,
  onSwitchColumn,
}: ColumnSelectorProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [optionsState, setOptionsState] = useState<
    Map<string, ColumnSelectorItem>
  >(new Map());

  useEffect(() => {
    setOptionsState(buildOptions(columns));
  }, [columns]);

  const checkboxes = Array.from(optionsState).map(
    ([key, { displayName }]) =>
      ({
        key,
        label: (
          <Checkbox
            value={key}
            disabled={
              (key === "all" && optionsState.get("all")?.isSelected) ||
              (key === "default" && optionsState.get("default")?.isSelected)
            }
            checked={optionsState.get(key)?.isSelected}
          >
            {displayName}
          </Checkbox>
        ),
        type: key === "divider" ? "divider" : "checkbox",
      } as MenuItemType)
  );

  const menuProps = {
    items: checkboxes,
    onClick: (e: { key: string }) => {
      onSwitchColumn?.(e.key);
    },
  };

  return (
    <Dropdown
      open={open}
      trigger={["click"]}
      menu={menuProps as unknown as MenuProps}
    >
      <Button onClick={() => setOpen(!open)}>
        Columns <CaretDownOutlined />
      </Button>
    </Dropdown>
  );
}

function buildOptions<T>(columns: DataGridExtendedColumn<T>[]) {
  const isAllSelected = columns.every((x) => !x.hidden);
  const isDefaultSelected = columns.every((x) => x.hidden === x.defaultHidden);

  const options = new Map<string, ColumnSelectorItem>([
    ["all", { displayName: "Show All", isSelected: isAllSelected }],
    ["default", { displayName: "Show Default", isSelected: isDefaultSelected }],
    ["divider", { displayName: "<Divider/>" }],
  ]);
  columns.forEach((x) => {
    options.set(x.key!.toString(), {
      displayName: x.title?.toString(),
      isSelected: !x.hidden,
    });
  });

  return options;
}
