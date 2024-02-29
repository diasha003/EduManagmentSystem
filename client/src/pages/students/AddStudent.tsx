import React from "react"
import { Link } from "react-router-dom"
import AddStudentForm from "./components/studentAddition/AddStudentForm"

const AddStudent: React.FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link to="/students" style={{alignSelf: "flex-start", margin: "10px 0 10px 250px" }}>Back to Students</Link>
            <AddStudentForm />
            <p>test</p>
        </div>
    )
}


export default AddStudent;