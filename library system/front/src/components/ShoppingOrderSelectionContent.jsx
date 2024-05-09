import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'

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

export const StudentCourseSelectionContent = (props) => {
    

    const columns = React.useMemo(
        () => [
          {
            Header: 'info',
            columns: [
              {
                Header: 'Id',
                accessor: 'id',
              },
              {
                Header: 'Course Code',
                accessor: 'course_code',
              },
              {
                Header: 'Name',
                accessor: 'name',
              },
            ],
          }
        ],
        []
      )
    return (
        <div id="StudentCourseSelectionContent-div">
            <p><strong>StudentCourseSelectionContent</strong> </p>
            <Table columns={columns} data={props.data} />
            
            
            
        </div>
    );
    
    
    
}
