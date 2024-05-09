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
        <BTable striped bordered hover size="sm" {...getTableProps()}>
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

export const ItemListContent = (props) => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Order',
                columns: [
                    {
                        Header: 'Order ID',
                        accessor: 'id',
                    },
                    {
                        Header:  'Paid',
                        accessor: 'is_paid',
                    }
                ],
            },
        ],
        []
    )
    return (
        <div id="ItemListContent-div">
            <Table columns={columns} data={props.data} />
        </div>
    );

}
