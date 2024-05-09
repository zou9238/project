import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {UserModal} from "./UserModal";

import { getUsers, getUserById} from "../controller/UserController";
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
      <BTable bsPrefix='BTableStyle' striped bordered hover size="sm"  {...getTableProps()}>
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

export const UserContent = (props) => {
    const [userName, setUserName] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const [data, setData] = React.useState([]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTittle, setModalTittle] = React.useState("");
    const [modelMode, setModalMode] = React.useState("");
    
    useEffect(() => {
        setUserName(props.userName);
    }, [props.userName]);
    
    useEffect(() => {
        updateUsersWithTable();
    }, []);

    
    function createUserWithModal() {
      
      setModalTittle("新增使用者資料")
      setModalMode("create");
      setModalShow(true);
      console.log("createUserWithModal");
    }

    async function updateUserWithModal(userId) {
      let resJson = await getUserById(userId)
      setUser(resJson);
      setModalTittle("修改使用者資料")
      setModalMode("update");
      setModalShow(true);
      console.log(userId);
      console.log("updateUserWithModal");
    }

    

    async function updateUsersWithTable(){
        let resJson = await getUsers();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);
    }
    const columns = React.useMemo(
        () => [
          {
            Header: '使用者資料',
            columns: [
              {
                Header: '姓名',
                accessor: 'name',
              },
              {
                Header: '電話號碼',
                accessor: 'phone_number',
              },
              {
                Header: '電子信箱',
                accessor: 'email',
              },
            ],
          },
          {
            Header: '管理使用者',
            columns: [
              {
                Header: '修改',
                accessor: 'id',
                Cell: ({ cell }) => (
                  <>  
                    <Button onClick={() => updateUserWithModal(cell.row.values.id)} className="ButtonStyle">
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
        <div id="UserContent-div">
            {userName}
            <div className="h-4">
            
            <Button onClick={() => createUserWithModal()} className="ButtonStyle">
                新增使用者資料
            </Button>

            <Table columns={columns} data={data} />
            </div>
            <UserModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              refreshtable={() => updateUsersWithTable()}
              backdrop="static"
              title= {modalTittle}
              mode = {modelMode}
              user = {user}
              setUser = {setUser}
            />
        </div>
    );
    
    
    }

