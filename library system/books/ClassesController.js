import { v4 as uuidv4 } from 'uuid';
function newuuid() {
    const id = uuidv4();
  return id;
}
export function createClass(name){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "name":name,
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/classes"
    
    
    return fetch(uri, options).then(response => response.json())
            
    
}

export function getClass(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/classes"
    
    return fetch(uri, options).then(response => response.json())
    
}

export function getClassById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/classes/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function updateClass(id,classes){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(author)
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/classes/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

