import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {AuthorModal} from "./AuthorModal";

import { getAuthor, getAuthorById, deleteAuthor,updateAuthor } from "../controller/AuthorController";
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

export const AuthorContent = (props) => {
    const [authorName, setAuthorName] = React.useState(null);
    const [author, setAuthor] = React.useState(null);

    const [data, setData] = React.useState([]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTittle, setModalTittle] = React.useState("");
    const [modelMode, setModalMode] = React.useState("");
    
    useEffect(() => {
        setAuthorName(props.authorName);
    }, [props.authorName]);
    
    useEffect(() => {
        updateAuthorsWithTable();
    }, []);

    function createAuthorWithModal() {
      
      setModalTittle("新增作者資料")
      setModalMode("create");
      setModalShow(true);
      console.log("createAuthorWithModal");
    }

    async function updateAuthorWithModal(authorId) {
      let resJson = await getAuthorById(authorId)
      setAuthor(resJson);
      setModalTittle("修改作者資料")
      setModalMode("update");
      setModalShow(true);
      console.log(authorId);
      console.log("createAuthorWithModal");
    }

    

    async function updateAuthorsWithTable(){
        let resJson = await getAuthor();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);
    }
    const columns = React.useMemo(
        () => [
          {
            Header: '作者',
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
                    <Button onClick={() => updateAuthorWithModal(cell.row.values.id)} className="btn btn-dark">
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
        <div id="AuthorContent-div">
            <p><strong>AuthorContent</strong> </p>
            {authorName}
            <div className="h-4">
            <Button onClick={() => createAuthorWithModal()} className="btn btn-dark">
                新增作者
            </Button>

            <Table columns={columns} data={data} />
            </div>
            <AuthorModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              refreshtable={() => updateAuthorsWithTable()}
              backdrop="static"
              title= {modalTittle}
              mode = {modelMode}
              author = {author}
              setAuthor = {setAuthor}
            />
        </div>
    );
    
    
    }
