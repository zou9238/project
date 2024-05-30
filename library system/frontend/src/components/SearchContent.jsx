import '../styles/App.css';
import React, {useEffect} from "react";
import  BTable  from 'react-bootstrap/Table';
import { useTable, useFilters } from 'react-table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
      () => ({
        Filter: TextFilter
      }),
      []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
      defaultColumn,
    },
    useFilters
    );

    return (
      <BTable bsPrefix='BTableStyle' striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}className="text-center align-middle">
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </BTable>
    );
}

function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    return (
      <Form style={{ width: '200px'}}>
      <FormControl
          type="text"
          value={filterValue || ''}
          onChange={e => {
              setFilter(e.target.value || undefined);
          }}
          placeholder="搜尋..."
      />
  </Form>
    );
}

export const SearchContent = (props) => {
    const [data, setData] = React.useState([]);
    const [SearchData, setSearchData] = React.useState([]);
    useEffect(() => {
      // Call your function to fetch data here
      showSearchWithTable();
  }, []);

    async function showSearchWithTable() {
      let resJson = await getSearchs();
      setData(resJson);
  }

    function getSearchs() {
        const headers = new Headers();
        const options = {
            method: "GET",
            headers: headers,
        };
        const uri = "http://127.0.0.1:8080/books";
        return fetch(uri, options).then(response => response.json());
    }

    const columns = React.useMemo(
        () => [
          {
            Header: '書名',
            Filter: TextFilter,
            columns: [
              { accessor: 'name' },
            ],
          },
          {
            Header: '作者',
            Filter: TextFilter,
            columns: [
              { accessor: 'Author.name' },
            ],
          },
          {
            Header: '類別',
            Filter: TextFilter,
            columns: [
              { accessor: 'Class.name' },
            ],
          },
          {
            Header: '出版社',
            Filter: TextFilter,
            columns: [
              { accessor: 'publish' },
            ],
          },
          {
            Header: 'ISBN',
            Filter: TextFilter,
            columns: [
              { accessor: 'isbn' },
            ],
          },
          {
            Header: '狀態',
            Filter: TextFilter,
            columns: [
              { accessor: 'state' },
            ],
          },
        ],
        []
    );
    return (
        <div id="SearchContent-div">
            <div>
                  <Table columns={columns} data={data} className='BTableStyle' />
            </div>
        </div>
    );
}
