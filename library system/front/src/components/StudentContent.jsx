import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {StudentModal} from "./StudentModal";

import { getStudents, getStudentById, deleteStudent } from "../controller/StudentController";
import { set } from "react-hook-form";


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <BTable striped bordered hover size="sm"  {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
    )
  }

export const StudentContent = (props) => {
    const [studentName, setStudentName] = React.useState(null);
    const [student, setStudent] = React.useState(null);

    const [data, setData] = React.useState([]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTittle, setModalTittle] = React.useState("");
    const [modelMode, setModalMode] = React.useState("");
    
    useEffect(() => {
        setStudentName(props.studentName);
    }, [props.studentName]);
    
    useEffect(() => {
        updateStudentsWithTable();
    }, []);

    function changeStudentMessage() {
        setStudentName("changeStudentMessage");
        console.log("changeStudentMessage");
    }
    function  clearStudentMessage() {
        setStudentName("");
        console.log("clearStudentMessage");
    }
    
    function createStudentWithModal() {
      
      setModalTittle("新增學生資料")
      setModalMode("create");
      setModalShow(true);
      console.log("createStudentWithModal");
    }

    async function updateStudentWithModal(studentId) {
      let resJson = await getStudentById(studentId)
      setStudent(resJson);
      setModalTittle("修改學生資料")
      setModalMode("update");
      setModalShow(true);
      console.log(studentId);
      console.log("createStudentWithModal");
    }

    

    async function updateStudentsWithTable(){
        let resJson = await getStudents();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);
    }
    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            columns: [
              {
                Header: 'First Name',
                accessor: 'first_name',
              },
              {
                Header: 'Last Name',
                accessor: 'last_name',
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Student ID',
                accessor: 'student_id',
              },
              {
                Header: 'Department',
                accessor: 'department.name',
              },
              
            ],
          },
          {
            Header: 'Operation',
            columns: [
              {
                Header: '修改/刪除',
                accessor: 'id',
                Cell: ({ cell }) => (
                  <>  
                    <Button onClick={() => updateStudentWithModal(cell.row.values.id)} className="btn btn-dark">
                        修改
                    </Button>
                    
                    <Button onClick={async () => {
                      let resJson = await deleteStudent(cell.row.values.id);
                      console.log(resJson);
                      updateStudentsWithTable();
                    }} className="btn btn-dark">
                        刪除
                    </Button>
                  </>
                )
              },
              
            ],
          }
        ],
        []
      )
    
    
    return (
        <div id="StudentContent-div">
            <p><strong>StudentContent</strong> </p>
            {studentName}
            <div className="h-4">
            <Button onClick={() => changeStudentMessage()} className="btn btn-dark">
                Change and Rerender
            </Button>
            <Button onClick={() => clearStudentMessage()} className="btn btn-dark">
                Clear and Rerender
            </Button>
            <Button onClick={() => createStudentWithModal()} className="btn btn-dark">
                新增學生
            </Button>

            <Table columns={columns} data={data} />
            </div>
            <StudentModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              refreshtable={() => updateStudentsWithTable()}
              backdrop="static"
              title= {modalTittle}
              mode = {modelMode}
              student = {student}
              setStudent = {setStudent}
            />
        </div>
    );
    
    
    }

