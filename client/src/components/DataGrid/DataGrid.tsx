import { Button, Space, Table } from "antd";
import { ColumnSorter } from "./ColumnSorter";
import { ColumnType } from "antd/es/table";
import { ColumnSelector } from "./ColumnSelector";
import { useCallback, useState } from "react";
import { SorterResult } from "antd/es/table/interface";

export type DataGridProps<T> = {
  toolbar?: JSX.Element;
  showColumnsSelector?: boolean;
  showSort?: boolean;

  columns: DataGridColumn<T>[];
  dataSource: T[];
};

export type DataGridColumn<T> = {
  key: string;
  hidden?: boolean;
  title?: string;
  dataIndex?: string;
  width?: number;
  fixed?: "left" | "right";
  sorter?: (a: T, b: T) => number;
  sortOrder?: "ascend" | "descend";
};

export type DataGridExtendedColumn<T> = DataGridColumn<T> & {
  defaultHidden?: boolean;
};

export function DataGrid<T>({
  toolbar,
  showColumnsSelector,
  showSort,
  columns,
  dataSource,
}: DataGridProps<T>) {
  const [cols, setCols] = useState<DataGridExtendedColumn<T>[]>(
    columns.map((c) => ({ ...c, defaultHidden: c.hidden }))
  );

  const onSwitchShowColumn = useCallback(
    (key: string) => {
      if (key === "all") {
        setCols(cols.map((c) => ({ ...c, hidden: false })));
        return;
      } else if (key === "default") {
        setCols(cols.map((c) => ({ ...c, hidden: c.defaultHidden })));
        return;
      }

      const column = cols.find((c) => c.key === key);
      if (!column) return;

      setCols(
        cols.map((c) => (c.key === key ? { ...column, hidden: !c.hidden } : c))
      );
    },
    [cols]
  );

  const onSwitchSortOrder = useCallback(
    (key: string) => {
      if (key === "clear") {
        setCols(cols.map((c) => ({ ...c, sortOrder: undefined })));
        return;
      }

      const column = cols.find((c) => c.key === key);
      if (!column) return;

      setCols(
        cols.map((c) =>
          c.key === key
            ? {
                ...column,
                sortOrder: column.sortOrder
                  ? column.sortOrder === "ascend"
                    ? "descend"
                    : "ascend"
                  : "ascend",
              }
            : {
                ...c,
                sortOrder: undefined,
              }
        )
      );
    },
    [cols]
  );

  const handleHeaderClick = (sorter: SorterResult<any>) => {
    console.log(sorter.column?.key);
    if (!sorter.column?.key) {
      onSwitchSortOrder("clear");
      return;
    }

    onSwitchSortOrder(sorter.column.key.toString());
  };

  return (
    <div
      style={{
        margin: "5px 15px",
        padding: "10px 10px",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "16px 0px",
        }}
      >
        {toolbar}
        <Space>
          {showColumnsSelector && (
            <ColumnSelector
              columns={cols}
              onSwitchColumn={onSwitchShowColumn}
            />
          )}
          {showSort && (
            <ColumnSorter
              columns={cols}
              onSwitchSortOrder={onSwitchSortOrder}
            />
          )}
          <Button>Search</Button>
        </Space>
      </div>

      <Table
        columns={cols as ColumnType<any>[]}
        onChange={(_a, _b, sorter, _e) => {
          handleHeaderClick(sorter as unknown as SorterResult<any>);
        }}
        dataSource={dataSource}
        scroll={{ x: 1500, y: 300 }}
      />
    </div>
  );
}
