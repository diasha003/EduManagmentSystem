import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import columns, {
  DataType,
} from "../../../components/tables/studentsTable/constants/columns";

interface SelectedColumns {
  [key: string]: boolean;
}

interface StudentsTableState {
  selectedColumns: SelectedColumns;
}

const initialState: StudentsTableState = {
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

export const studentsTableSlice = createSlice({
  name: "studentsTable",
  initialState,
  reducers: {
    updateCheckBoxes(state, action: PayloadAction<string>) {
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

export const studentsTableActions = studentsTableSlice.actions;
export const studentsTableReducer = studentsTableSlice.reducer;
