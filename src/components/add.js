import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import axios from "axios";
import { useEffect, useState } from "react";
export default function AddNew() {
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8080/employee/api/v1/department").then(e => {
            setDepartment(e.data);
        })
    }, [])

    const navigate = useNavigate();
    const formAdd = useFormik({
        initialValues: {
            name: "",
            code: "",
            age: "",
            salary: "",
            department:{
                id: ""
            }
        },
        onSubmit: (values) => {
            axios.post("http://127.0.0.1:8080/employee/api/v1/save", values).then((e) => {
                
                navigate("/home")
            })
        }
    })

    return (
        <>
            <Link to={"/home"}>
                <button className="btn btn-primary">Back to list</button>
            </Link>
            <div className="w-50">
                <form onSubmit={formAdd.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" onChange={formAdd.handleChange} id="name" className="form-control" placeholder="Enter name" ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Code</label>
                        <input type="text" name="code" onChange={formAdd.handleChange} id="code" className="form-control" placeholder="Enter code" ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" name="age" onChange={formAdd.handleChange} id="age" className="form-control" placeholder="Enter age" ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input type="text" name="salary" onChange={formAdd.handleChange} id="salary" className="form-control" placeholder="Enter salary" ></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select name="department.id" className="form-select" id="department" onChange={formAdd.handleChange}>
                            <option>select</option>
                            {department.map(item => (
                                <option key={item.id} value={item.id}>{item.departmentName}</option>
                            ))}
                        </select>


                    </div>
                    <div className="mb-3">
                        <button type="submit" className=" me-1 btn btn-success">Save</button>
                        <Link to={"/home "}>
                            <button className="ms-4 btn btn-light">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>

        </>
    )
}