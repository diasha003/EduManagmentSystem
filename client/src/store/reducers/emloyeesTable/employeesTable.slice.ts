import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import columns from "../../../components/tables/employeesTable/constants/columnsEmployeesTable";

interface SelectedColumns {
  [key: string]: boolean;
}

interface EmployeesTableState {
  selectedColumns: SelectedColumns;
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
    },
  },
});

export const employeesTableActions = employeesTableSlice.actions;
export const employeesTableReducer = employeesTableSlice.reducer;
