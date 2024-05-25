import React, { useEffect } from "react";
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'

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
        <BTable striped bordered hover size="sm" variant="dark" {...getTableProps()}>
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
                    );
                })}
            </tbody>
        </BTable>
    )
}

export const SelectionContent = (props) => {
    

    const columns = React.useMemo(
        () => [
          {
            Header: '詳細資料',
            columns: [
              {
                Header: '訂單',
                accessor: 'id',
              },
              {
                Header: '是否已付款',
                accessor: 'is_paid',
              },
            ],
          }
        ],
        []
      )
    return (
        <div id="SelectionContent-div">
            <Table columns={columns} data={props.data} />           
        </div>
    );
    
    
    
}
