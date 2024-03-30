import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import columns, {
  DataType,
} from "../../../components/tables/employeesTable/constants/columnsEmployeesTable";
import { TableColumnsType, TableProps } from "antd";
import { Key } from "react";
import { SortOrder } from "antd/es/table/interface";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface SelectedColumns {
  [key: string]: boolean;
}

interface EmployeesTableState {
  selectedColumns: SelectedColumns;
  columnSortState: TableColumnsType<DataType>;
}

const initialState: EmployeesTableState = {
  selectedColumns: {
    ...Object.fromEntries(
      new Map<string, boolean>(
        columns.map((item) => [item.key as string, !item.hidden as boolean])
      )
    ),
    all: false,
    default: true,
  },
  columnSortState: columns,
};

export const employeesTableSlice = createSlice({
  name: "employeesTable",
  initialState,
  reducers: {
    updateCheckBoxesEmployeesTable(state, action: PayloadAction<string>) {
      if (action.payload === "default") {
        state.selectedColumns = initialState.selectedColumns;
      } else if (action.payload === "all") {
        Object.keys(state.selectedColumns).forEach((key) => {
          state.selectedColumns[key] = true;
        });
        state.selectedColumns["default"] = false;
      } else {
        state.selectedColumns = {
          ...state.selectedColumns,
          [action.payload]: !state.selectedColumns[action.payload],
          ["all"]: false,
          ["default"]: false,
        };
      }
      state.columnSortState = state.columnSortState.map((item) => ({
        ...item,
        hidden: !(state.selectedColumns[`${item.key}`] as boolean),
      }));
    },

    updateColumnSortEmployeesTable(state, action: PayloadAction<Sorts>) {
      state.columnSortState = state.columnSortState.map((item) =>
        item.key === action.payload.columnKey
          ? {
              ...item,
              sortOrder: action.payload.order
                ? action.payload.order
                : item.sortOrder === "ascend"
                ? "descend"
                : "ascend",
            }
          : { ...item, sortOrder: null }
      );
    },
  },
});

export const employeesTableActions = employeesTableSlice.actions;
export const employeesTableReducer = employeesTableSlice.reducer;
