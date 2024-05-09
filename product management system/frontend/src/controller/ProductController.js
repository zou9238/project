import { v4 as uuidv4 } from 'uuid';
function newuuid() {
    const id = uuidv4();
  return id;
}//自動生成uuid
export function createProduct(name, price, categoryId){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "id":newuuid(),
            "name":name,
            "price":price,
            "category_id":categoryId
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/products"



    return fetch(uri, options).then(response => response.json())


}

export function getProducts(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/products"

    return fetch(uri, options).then(response => response.json())

}

export function getProductById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/products/" + id

    return fetch(uri, options).then(response => response.json())

}

export function updateProduct(id, product){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(product)
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/products/" + id

    return fetch(uri, options).then(response => response.json())

}

export function deleteProduct(id){
    const headers = new Headers()
    const options = {
        method: "DELETE",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/products/" + id

    return fetch(uri, options).then(response => response.json())

}