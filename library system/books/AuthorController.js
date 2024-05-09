import { v4 as uuidv4 } from 'uuid';
function newuuid() {
    const id = uuidv4();
  return id;
}
export function createAuthor(name){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "name":name,
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/authors"
    
    
    return fetch(uri, options).then(response => response.json())
            
    
}

export function getAuthor(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/authors"
    
    return fetch(uri, options).then(response => response.json())
    
}

export function getAuthorById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/authors/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function updateAuthor(id,author){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(author)
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/authors/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function deleteAuthors(id){
    const headers = new Headers()
    const options = {
        method: "DELETE",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/authors/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

