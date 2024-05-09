import { startTransition } from 'react';
import { v4 as uuidv4 } from 'uuid';
function newuuid() {
    const id = uuidv4();
  return id;
}//自動生成uuid

export function createUser(name,phone_number,email){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "id":newuuid(),//自動生成uuid
            "name":name,
            "phone_number":phone_number,
            "email":email
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/users"
    
    
    return fetch(uri, options).then(response => response.json())

}

export function getUsers(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/users"
    
    return fetch(uri, options).then(response => response.json())
    
}

export function getUserById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/users/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function updateUser(id, user){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(user)
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/users/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}
