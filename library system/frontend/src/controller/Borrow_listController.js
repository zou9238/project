import { v4 as uuidv4 } from 'uuid';
function newuuid() {
    const id = uuidv4();
  return id;
}//自動生成uuid

export function createBorrow_list(bookId, userId, expiration){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "id":newuuid(),
            "user_id":userId,
            "book_id":bookId,
            "expiration":expiration,
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/borrow_lists"

    return fetch(uri, options).then(response => response.json())
}

export function getBorrow_lists(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/borrow_lists"

    return fetch(uri, options).then(response => response.json())

}

export function getBorrow_listById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/borrow_lists/" + id

    return fetch(uri, options).then(response => response.json())

}

export function updateBorrow_list(id, borrow_list){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(borrow_list)
    };
    const uri = "http://localhost:8080/borrow_lists/" + id

    return fetch(uri, options).then(response => response.json())

}
