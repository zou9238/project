import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {BookModal} from "./BookModal";

import { getBooks, getBookById, deleteBook } from "../controller/BookController";
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

export const BookContent = (props) => {
    const [bookName, setBookName] = React.useState(null);
    const [book, setBook] = React.useState(null);

    const [data, setData] = React.useState([]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTittle, setModalTittle] = React.useState("");
    const [modelMode, setModalMode] = React.useState("");
    
    useEffect(() => {
        setBookName(props.bookName);
    }, [props.bookName]);
    
    useEffect(() => {
        updateBooksWithTable();
    }, []);

    function changeBookMessage() {
        setBookName("changeBookMessage");
        console.log("changeBookMessage");
    }
    function  clearBookMessage() {
        setBookName("");
        console.log("clearBookMessage");
    }
    
    function createBookWithModal() {
      
      setModalTittle("新增學生資料")
      setModalMode("create");
      setModalShow(true);
      console.log("createBookWithModal");
    }

    async function updateBookWithModal(bookId) {
      let resJson = await getBookById(bookId)
      setBook(resJson);
      setModalTittle("修改學生資料")
      setModalMode("update");
      setModalShow(true);
      console.log(bookId);
      console.log("createBookWithModal");
    }

    

    async function updateBooksWithTable(){
        let resJson = await getBooks();
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
                Header: 'Book ID',
                accessor: 'book_id',
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
                    <Button onClick={() => updateBookWithModal(cell.row.values.id)} className="btn btn-dark">
                        修改
                    </Button>
                    
                    <Button onClick={async () => {
                      let resJson = await deleteBook(cell.row.values.id);
                      console.log(resJson);
                      updateBooksWithTable();
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
        <div id="BookContent-div">
            <p><strong>BookContent</strong> </p>
            {bookName}
            <div className="h-4">
            <Button onClick={() => changeBookMessage()} className="btn btn-dark">
                Change and Rerender
            </Button>
            <Button onClick={() => clearBookMessage()} className="btn btn-dark">
                Clear and Rerender
            </Button>
            <Button onClick={() => createBookWithModal()} className="btn btn-dark">
                新增學生
            </Button>

            <Table columns={columns} data={data} />
            </div>
            <BookModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              refreshtable={() => updateBooksWithTable()}
              backdrop="static"
              title= {modalTittle}
              mode = {modelMode}
              book = {book}
              setBook = {setBook}
            />
        </div>
    );
    
    
    }

