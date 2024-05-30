import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import {ProductModal} from "./ProductModal";
import { getProducts, getProductById, deleteProduct, updateProduct } from "../controller/ProductController";
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

export const ProductContent = (props) => {
  const [productName, setProductName] = React.useState(null);
  const [product, setProduct] = React.useState(null);

  const [data, setData] = React.useState([]);

  const [modalShow, setModalShow] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");
  const [modelMode, setModalMode] = React.useState("");

  useEffect(() => {
    setProductName(props.productName);
}, [props.productName]);

useEffect(() => {
    updateProductsWithTable();
}, []);

function createProductWithModal(){
  setModalTittle("新增商品資料")
  setModalMode("create")
  setModalShow(true);
  console.log("createProductWithModal");
}

async function updateProductsWithModal(product_id){
  let resJson = await getProductById(product_id);
  setProduct(resJson);
  setModalTittle("修改商品資料")
  setModalMode("update")
  setModalShow(true);
  console.log(product_id);
  console.log("updateProductsWithModal");
}

async function updateProductsWithTable(){
  let resJson = await getProducts();
  resJson.forEach(element => {
      console.log(element);
  });
  console.log(resJson);
  setData(resJson);
}
const columns = React.useMemo(
  () => [
    {
      Header: '商品',
      columns: [
          {
              Header: '商品名稱',
              accessor: 'name',
          },
          {
              Header: '價格',
              accessor: 'price',
          },
      ],
      },
      {
          Header: '操作',
          columns: [
              {
                  Header: '修改/刪除',
                  accessor: 'id',
                  Cell: ({ cell }) => (
                      <>  
                          <Button onClick={() => updateProductsWithModal(cell.row.values.id)} className="btn btn-dark">
                              修改
                          </Button>

                          <Button onClick={async () => {
                            let resJson = await deleteProduct(cell.row.values.id);
                            console.log(resJson);
                            updateProductsWithTable();
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
  <div id="ProductContent-div">
      <div className="h-4">
      <Button size="lg" variant="dark" onClick={() => createProductWithModal()} className="btn btn-dark">
          新增商品
      </Button>
      <Table columns={columns} data={data} />
      </div>
      <ProductModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          refreshtable={updateProductsWithTable}
          backrop="static"
          tittle={modalTittle}
          mode={modelMode}
          product={product}
          setProduct={setProduct}
      />
  </div>
);
}

