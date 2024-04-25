import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Home() {
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [search,setSearch] = useState();
    const [selected, setSelected] = useState();


    useEffect(() => {
        axios.get("http://127.0.0.1:8080/employee/api/v1")
            .then(e => {
                setPage(e.data.totalPages)
                setCurrentPage(e.data.pageable.pageNumber);
                console.log(e.data.totalPages)
                console.log(e.data.pageable.pageNumber)
                setEmployee(e.data.content)
                setLoading(true)
            })
    }, [])

    const pageA = (id,search) =>{
        console.log(search);
        console.log(id);
        if(search == undefined){
            axios.get("http://127.0.0.1:8080/employee/api/v1?page="+id)
            .then(e => {
                setPage(e.data.totalPages)
                setCurrentPage(e.data.pageable.pageNumber);
                setEmployee(e.data.content)
                setLoading(true)
            })
        } else{
            axios.get("http://127.0.0.1:8080/employee/api/v1/search/"+search+"?page="+id)
            .then(e => {
                setPage(e.data.totalPages)
                setCurrentPage(e.data.pageable.pageNumber);
                setEmployee(e.data.content)
                setLoading(true)
                setSearch(search)
            })
        }
    
    }
    const deleteUser = (id) => {
        Swal.fire({
            title: "Do u want delete this ?",
            confirmButtonText: "Yes",
            showCancelButton: true,
        }).then((e) => {
            if (e.isConfirmed) {
                setLoading(false)
                console.log(id)
                axios.delete("http://127.0.0.1:8080/employee/api/v1/delete/" + id).then(() => {
                    axios.get("http://127.0.0.1:8080/employee/api/v1").then((e) => {
                        setLoading(false)
                        setEmployee(e.data);
                    })
                })
            }
        })
    }

    const handleChange = (e) =>{
        setSelected(e.target.value)
    }

    const handleChangeText = (e) =>{
        console.log(e.target.value)
    }



    return (
        <>
            <div>
                <Link to={"/create"}>
                    <button className="btn btn-primary m-4">Add new</button>
                </Link>
                <div>
                    <input type="text" onChange={handleChangeText}/>
                    <select value={selected} onChange={handleChange}>
                        <option selected>select</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                    <button onClick={() => pageA(0,selected)}>Search</button>
                </div>
            </div>
            {!loading ? (<div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>) :
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Age</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Department</th>
                            <th colSpan={2} scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>{item.age}</td>
                                <td>{item.salary}</td>
                                <td>{item.department.departmentName}</td>
                                <td>
                                    <Link to={"/update/" + item.id}>
                                        <button className="btn btn-success">Update</button>
                                    </Link>
                                    <button id="delete" className=" ms-2 btn btn-danger" onClick={() => deleteUser(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <div className="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a onClick={() =>pageA(currentPage-1,selected)} className="page-link">Prev</a></li>
                    <li className="page-item"><a onClick={() =>pageA(currentPage+1,selected)} className="page-link">Next</a></li>
                </ul>
            </div>
        </>
    )

}
export default Home