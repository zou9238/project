import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import {InputGroup} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import {StudentCourseSelectionContent} from "./StudentCourseSelectionContent";

export const SelectCourseListContent = (props) => {
    //const [student, setStudent] = React.useState(null);
    const [studentsDBSource, setStudentsDBSource] = React.useState(null);
    const [studentCourse, setStudentCourse] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(true);
    
    const { register, handleSubmit, watch, reset } = useForm();
    const updateStudentCourseSelection = async (data) => {
        
        console.log(data['student']);
        let resJson = await getStudentCourses(data['student'])
        console.log(resJson);
        setStudentCourse(resJson);
        if(resJson.length == 0){
            alert("查無資料");
        }
    }
    const generateFormComps = (obj) => {
        if (!obj) return null;
        const { key, option, label } = obj;
            

        return (
            <InputGroup key={key}>
                <InputGroup.Text id={key}>{label}</InputGroup.Text>
                <Form.Select className="w-25" {...register(key)}>
                {
                    option.map(({ name, value }) => <option value={value} key={value}>{name}</option>)
                }
                </Form.Select>
            </InputGroup>
        );
    }

    
    async function updateStudentsOption(){
        let resJson = await getStudents();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        
        let options = [];
        resJson.forEach(element => {
            options.push({
                "name":element.first_name + " " + element.last_name + "(" +element.student_id + ")",
                "value":element.id
            })
        });
        let departmentsOption = {
            key:"student",
            "option":options,
            "label":"學生",
        };
        console.log(departmentsOption);
        setStudentsDBSource(departmentsOption);
    }

    function getStudents(){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: 'no-cors'
        };
        const uri = "http://localhost:8080/students"
        
        return fetch(uri, options).then(response => response.json())
        
    }

    function getStudentCourses(studentId){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: 'no-cors'
        };
        const uri = "http://localhost:8080/students/" + studentId + "/courses"
        
        return fetch(uri, options).then(response => response.json())
        
    }

    useEffect(() => {
        updateStudentsOption()
    }, [])

    return (
        <div id="SelectCourseListContent-div">
            <p><strong>SelectCourseListContent</strong> </p>
            <Form onSubmit={handleSubmit(updateStudentCourseSelection)}>
                <Stack direction="horizontal" gap={3}>
                    {generateFormComps(studentsDBSource)}
                    <Button type="submit" className="btn btn-dark">查詢</Button>
                </Stack>
            </Form>
            <br/>
            <StudentCourseSelectionContent data={studentCourse}  />
            
            
            
        </div>
    );
    
    
    }

