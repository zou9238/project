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

    
    function createBookWithModal() {
      
      setModalTittle("新增書籍資料")
      setModalMode("create");
      setModalShow(true);
      console.log("createBookWithModal");
    }

    async function updateBookWithModal(bookId) {
      let resJson = await getBookById(bookId)
      setBook(resJson);
      setModalTittle("修改書籍資料")
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
            Header: '書名',
            accessor: 'name',
          },
          {
            Header: '詳細資料',
            columns: [
              {
                Header: '作者',
                accessor: 'Author.name',
              },
              {
                Header: 'ISBN',
                accessor: 'isbn',
              },
              {
                Header: '出版社',
                accessor: 'publish',
              },
              
              {
                Header: '類別',
                accessor: 'Class.name',
              },
              {
                Header: '狀態',
                accessor: 'state',
              },
              
            ],
          },
          {
            Header: '管理書籍',
            columns: [
              {
                Header: '修改/刪除',
                accessor: 'id',
                Cell: ({ cell }) => (
                  <>  
                    <Button onClick={() => updateBookWithModal(cell.row.values.id)} className="ButtonStyle">
                        修改
                    </Button>
                    
                    <Button onClick={async () => {
                      let resJson = await deleteBook(cell.row.values.id);
                      console.log(resJson);
                      updateBooksWithTable();
                    }} className="ButtonStyle">
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
            {bookName}
            <div className="h-4">
            
            <Button onClick={() => createBookWithModal()} className="ButtonStyle">
                新增書籍資料
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

