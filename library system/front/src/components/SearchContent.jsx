import '../styles/App.css';
import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import  BTable  from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { List } from "react-virtualized";
import { SearchContentDetial } from "./SearchContentDetial";
import { useTable, useFilters } from 'react-table'
function Table({ columns, data}) {
    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: TextFilter
      }),
      []
    )

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
      defaultColumn,
    },
    useFilters
    )
    
    // Render the UI for your table
    return (
      <BTable  bsPrefix='BTableStyle' striped bordered hover {...getTableProps()}>
        <thead >
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
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

  function TextFilter({column: { filterValue, preFilteredRows, setFilter },}) {
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`搜尋...`}
      />
    )
  }



  

  export const SearchContent = (props) => {
    const [data, setData] = React.useState([])
    const [SearchData, setSearchData] = React.useState([])
    const [tabKey, setTabKey] = React.useState('table');

    
    async function showSearchWithTable() {
        let resJson = await getSearchs();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);

    }
    
    function getSearchs(){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: "no-cors"
        };
        const uri = "http://127.0.0.1:8080/books" 
        
        return fetch(uri, options).then(response => response.json())
        
    }
    console.log("searchcontent");
    //進入頁面執行一次showSearchWithTable
    const columns = React.useMemo(
        () => [
          {
            Header: '書名',
            Filter: TextFilter,
            columns: [
              {
                accessor: 'name',
              },
            ],
          },
          {
            Header: '作者',
            Filter: TextFilter,
            columns: [
              {
                accessor: 'Author.name',
              },
            ],
          },
          {
            Header: '類別',
            Filter: TextFilter,
            columns: [
              {
                accessor: 'Class.name',
              },
            ],
          },
          {
            Header: '出版社',
            Filter: TextFilter,
            columns: [
              {
                accessor: 'publish',
              },
            ],
          },
          {
            Header: 'ISBN',
            Filter: TextFilter,
            columns: [
              {
                accessor: 'isbn',
              },
            ],
          },
          {
            Header: '狀態',
            Filter: TextFilter,
            columns: [
              {
                accessor: 'state',
              },
            ],
          },
        ]
      )
    
    function rowRenderer({ key, index, isScrolling, style }) {
        if(isScrolling){
            return <div key={ key } style={ style }>Updating</div>
        }else{
            //return <div key={ key } style={ style }>{ data[index].name }</div>
            return <SearchContentDetial key={key} style={style} Search={SearchData[index]}/>
        } 
    }

    return (
        <div id="SearchContent-div" >
            <div>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              activeKey={tabKey}
              onSelect={(k) => setTabKey(k)}
            >
              <Tab eventKey="table">
                <Table columns ={columns } data={data} className='BTableStyle'/>
              </Tab>
                <List
                  // window height
                  height={300}
                  // window width
                  width={300}
                  // prerender rows
                  overscanRowCount = { 2 }
                  // total count
                  rowCount={SearchData.length}
                  // row height
                  rowHeight={60}
                  style={{ outline: "none"}}
                  rowRenderer={rowRenderer}
                />
            </Tabs>
            <Button size='lg'  onClick={() => showSearchWithTable()} className="ButtonStyle">
            顯示
            </Button>
            </div>
        </div>
    );
    
    
    }

