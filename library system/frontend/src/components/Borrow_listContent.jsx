import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {Borrow_listModal} from "./Borrow_listModal";

import { getBorrow_lists, getBorrow_listById} from "../controller/Borrow_listController"
import { set } from "react-hook-form";

function Table({ columns, data }) {
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

    return (
        <BTable   bsPrefix='BTableStyle'{...getTableProps()}>
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

export const Borrow_listContent = (props) => {
    const [borrow_listName, setBorrow_listName] = React.useState(null);
    const [borrow_list, setBorrow_list] = React.useState(null);

    const [data, setData] = React.useState([]);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTittle, setModalTittle] = React.useState("");
    const [modelMode, setModalMode] = React.useState("");

    useEffect(() => {
        setBorrow_listName(props.borrow_listName);
    }, [props.borrow_listName]);

    useEffect(() => {
        updateBorrow_listsWithTable();
    }, []);

    function createBorrow_listWithModal(){
        setModalTittle("新增借閱資料")
        setModalMode("create")
        setModalShow(true);
        console.log("createBorrow_listWithModal");
    }

    async function updateBorrow_listsWithModal(borrow_list_id){
        let resJson = await getBorrow_listById(borrow_list_id);
        setBorrow_list(resJson);
        setModalTittle("修改借閱資料")
        setModalMode("update")
        setModalShow(true);
        console.log(borrow_list_id);
        console.log("updateBorrow_listsWithModal");
    }

    async function updateBorrow_listsWithTable(){
        let resJson = await getBorrow_lists();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);
    }
    const columns = React.useMemo(
        () => [
          {
            Header: '借閱紀錄',
            columns: [
                {
                    Header: '書名',
                    accessor: 'book.name',
                },
                {
                    Header: '借閱人',
                    accessor: 'user.name',
                },
                {
                    Header: '歸還時間',
                    accessor: 'expiration',
                },
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
                                <Button onClick={() => updateBorrow_listsWithModal(cell.row.values.id)} className="ButtonStyle">
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
        <div id="Borrow_listContent-div">
            <div className="h-4">
            <Button size="lg"  onClick={() => createBorrow_listWithModal()} className="ButtonStyle">
                新增借閱紀錄
            </Button>

            <Table columns={columns} data={data} />
            </div>
            <Borrow_listModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                refreshtable={updateBorrow_listsWithTable}
                backrop="static"
                tittle={modalTittle}
                mode={modelMode}
                borrow_list={borrow_list}
                setBorrow_list={setBorrow_list}
            />
        </div>
    );
}
