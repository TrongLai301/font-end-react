import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom"

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get("http://127.0.0.1:8080/employee/api/v1/findById/"+ id),
            axios.get("http://127.0.0.1:8080/employee/api/v1/department")
        ]).then(([employeeRes, departmentRes]) => {
            setDepartment(departmentRes.data);

           formUpdate.setValues({... employeeRes.data});
        })
    }, [])

    const formUpdate = useFormik({
        initialValues: {
            name: "",
            code: "",
            age: "",
            salary: "",
            department: {
                id: ""
            }
        },
        onSubmit(values) {
            axios.put("http://127.0.0.1:8080/employee/api/v1/update/" + id, values).then(() => {
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
                <form onSubmit={formUpdate.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={formUpdate.values.name} name="name" onChange={formUpdate.handleChange} id="name" className="form-control" placeholder="Enter name" ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Code</label>
                        <input type="text" value={formUpdate.values.code} name="code" onChange={formUpdate.handleChange} id="code" className="form-control" placeholder="Enter code" ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" value={formUpdate.values.age} name="age" onChange={formUpdate.handleChange} id="age" className="form-control" placeholder="Enter age" ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary"  className="form-label">Salary</label>
                        <input type="text" value={formUpdate.values.salary} name="salary" onChange={formUpdate.handleChange} id="salary" className="form-control" placeholder="Enter salary" ></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select name="department.id" defaultValue={1} className="form-select" id="department" onChange={formUpdate.handleChange}>
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