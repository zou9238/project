import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import  BTable  from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { List } from "react-virtualized";
import { ProductContentDetial } from "./ProductContentDetial";
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
            )
          })}
        </tbody>
      </BTable>
    )
  }

  export const HomeContent = (props) => {
    
    const [data, setData] = React.useState([])
    const [ProductData, setProductData] = React.useState([])
    const [tabKey, setTabKey] = React.useState('table');


    async function showProductWithTable() {
        let resJson = await getProducts();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        setData(resJson);

    }


    function clearProductWithTable() {
      setData([]);
    }
  
    function getProducts(){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: "no-cors"
        };
        const uri = "http://localhost:8080/products" 
        
        return fetch(uri, options).then(response => response.json())
        
    }
    console.log("homecontent");

    const columns = React.useMemo(
        () => [
          {
            Header: '名稱',
            columns: [
              {
                accessor: 'name',
              },
            ],
          },
          {
            Header: '價格',
            columns: [
              {
                accessor: 'price',
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
            return <ProductContentDetial key={key} style={style} Product={ProductData[index]}/>
        } 
    }

    return (
        <div id="HomeContent-div" >
            <div className="h-4">
            <Button onClick={() => showProductWithTable()} className="btn btn-dark">
                顯示商品列表
            </Button>
            <Button onClick={() => clearProductWithTable()} className="btn btn-dark">
                清除商品列表
            </Button>
            <br/>
            <br/>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              activeKey={tabKey}
              onSelect={(k) => setTabKey(k)}
              className="mb-3"
              justify
            >
              <Tab eventKey="table">
                <Table columns={columns} data={data} />
              </Tab>
                <List
                  // window height
                  height={300}
                  // window width
                  width={300}
                  // prerender rows
                  overscanRowCount = { 2 }
                  // total count
                  rowCount={ProductData.length}
                  // row height
                  rowHeight={60}
                  style={{ outline: "none" }}
                  rowRenderer={rowRenderer}
                />
            </Tabs>
            
            
            </div>
        </div>
    );
    
    
    }

