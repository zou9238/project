export function createBook(firstName, lastName, bookId, departmentId){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "first_name":firstName,
            "last_name":lastName,
            "book_id":bookId,
            "department_id":departmentId
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