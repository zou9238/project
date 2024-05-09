export function createStudent(firstName, lastName, studentId, departmentId){
    const headers = new Headers()
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "first_name":firstName,
            "last_name":lastName,
            "student_id":studentId,
            "department_id":departmentId
        })
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/students"
    
    
    return fetch(uri, options).then(response => response.json())
            
    
}

export function getStudents(){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/students"
    
    return fetch(uri, options).then(response => response.json())
    
}

export function getStudentById(id){
    const headers = new Headers()
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/students/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function updateStudent(id, student){
    const headers = new Headers()
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(student)
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/students/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}

export function deleteStudent(id){
    const headers = new Headers()
    const options = {
        method: "DELETE",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/students/" + id
    
    return fetch(uri, options).then(response => response.json())
    
}