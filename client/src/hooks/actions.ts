import { useDispatch } from "react-redux";

import { bindActionCreators } from "@reduxjs/toolkit";
import { studentActions } from "../store/reducers/students/students.slice";
import { studentsTableActions } from "../store/reducers/studentsTable/studentsTable.slice";
import {employeesTableActions} from "../store/reducers/emloyeesTable/employeesTable.slice"

const actions = {
  ...studentActions,
  ...studentsTableActions,
  ...employeesTableActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
