import { startTransition } from 'react';
import { v4 as uuidv4 } from 'uuid';
function newuuid() {
    const id = uuidv4();
  return id;
}//自動生成uuid

export function createBook(name, isbn, publish, author_id, class_id, State){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "id":newuuid(),//自動生成uuid
            "name":name,
            "isbn":isbn,
            "publish":publish,
            "author_id":author_id,
            "class_id":class_id,
            "state":State
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/books"
    
    
    return fetch(uri, options).then(response => response.json())

}

export function getBooks(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/books"
    
    return fetch(uri, options).then(response => response.json())
    
}

export function getBookById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/books/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function updateBook(id, book){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(book)
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/books/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function deleteBook(id){
    const headers = new Headers()
    const options = {
        method: "DELETE",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/books/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}