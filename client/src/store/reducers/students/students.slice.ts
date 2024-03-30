import { createSlice } from "@reduxjs/toolkit";
import { IStudent } from "../../../models/IStudent";

interface StudentSlice{
    students: IStudent[]
}


const initialState: StudentSlice = {
    students: []
}


export const studentSlice = createSlice({
    name: "student", 
    initialState, 
    reducers: {

    }
})


export const studentActions = studentSlice.actions
export const studentReducer = studentSlice.reducer