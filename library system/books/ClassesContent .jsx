import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {ClassesModal} from "./ClassesModal";

import { getClass, getClassById } from "../controller/ClassesController";
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

export const ClassesContent = (props) => {
    const [classesName, setClassesName] = React.useState(null);
    const [classes, setClasses] = React.useState(null);

    const [data, setData] = React.useState([]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTittle, setModalTittle] = React.useState("");
    const [modelMode, setModalMode] = React.useState("");
    
    useEffect(() => {
        setClassesName(props.classesName);
    }, [props.classesName]);
    
    useEffect(() => {
        updateClassesWithTable();
    }, []);

    function createClassesWithModal() {
      
      setModalTittle("新增作者資料")
      setModalMode("create");
      setModalShow(true);
      console.log("createClassesWithModal");
    }

    async function updateClassesWithModal(classId) {
      let resJson = await getClassById(classId)
      setClasses(resJson);
      setModalTittle("修改作者資料")
      setModalMode("update");
      setModalShow(true);
      console.log(classId);
      console.log("creatClassesWithModal");
    }

    

    async function updateClassesWithTable(){
        let resJson = await getClass();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);
    }
    const columns = React.useMemo(
        () => [
          {
            Header: '類別',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
              },
//類別
            ],
          },
          {
            Header: '操作',
            columns: [
              {
                Header: '修改',
                accessor: 'id',
                Cell: ({ cell }) => (
                  <>  
                    <Button onClick={() => updateClassesWithModal(cell.row.values.id)} className="btn btn-dark">
                        修改
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
        <div id="ClassContent-div">
            {classesName}
            <div className="h-4">
            <Button onClick={() => createClassWithModal()} className="btn btn-dark">
                新增作者
            </Button>

            <Table columns={columns} data={data} />
            </div>
            <ClassModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              refreshtable={() => updateClassesWithTable()}
              backdrop="static"
              title= {modalTittle}
              mode = {modelMode}
              classes = {classes}
              setClass = {setClasses}
            />
        </div>
    );
    
    
    }
