import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";

import { createStudent, updateStudent } from "../controller/StudentController";

export const StudentModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource, setSelectDBSource] = React.useState(null);

    const [studentFirstName, setStudentFirstName] = React.useState(null);
    const [studentLastName, setStudentLastName] = React.useState(null);
    const [studentSID, setStudentSID] = React.useState(null);
    const [readOnly, setReadOnly] = React.useState("noReadOnly");
    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("first_name","");
            setValue("last_name","");
            setValue("student_id","");
            setValue("department_id","");
            setReadOnly("noReadOnly")
        }else{
            setReadOnly("noReadOnly")
        }
    }, [props.mode])
    
    const { register, setValue, handleSubmit, watch,reset } = useForm();
    const onSubmit = async (data) => {
        console.log("submit");
        console.log(data);
        let resJson
        if(props.mode == "create"){
            resJson = await createStudent(data.first_name, data.last_name, data.student_id, data.department_id)
        }else if(props.mode == "update"){
            let updateStudentObj = {
                "first_name":data.first_name,
                "last_name":data.last_name,
                "student_id":data.student_id,
                "department_id":data.department_id
            }
            resJson = await updateStudent(data.id, updateStudentObj)
        }
        if(resJson.message == null 
            || (resJson.message == "Update students Susseccfully" && props.mode == "update")){
            props.onHide();
            reset();
            setFormRequired(null);
            props.refreshtable();

        }else{
            console.log(resJson.message);
            if(props.mode == "create"){
                alert("Create Student Failed");
            }else if(props.mode == "update"){
                alert("Update Student Failed");
            }else{
                alert("Failed");
            }
        }
    }
    const handleClose = () => {
        console.log('close');
        props.onHide();
        props.setStudent(null);
        console.log(props.student);
        setStudentFirstName("");
        setStudentLastName("");
        setStudentSID("");
        setFormRequired(null);
    }
    async function updateDepartmentsOption(){
        let resJson = await getDepartments();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        
        let options = [];
        resJson.forEach(element => {
            options.push({
                "name":element.name + "(" +element.short_name + ")",
                "value":element.id
            })
        });
        let departmentsOption = {
            "key":"department_id",
            "option":options,
            "label":"科系",
        };
        console.log(departmentsOption);
        setSelectDBSource(departmentsOption);
    }
    function getDepartments(){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: 'no-cors'
        };
        const uri = "http://localhost:8080/departments"
        
        return fetch(uri, options).then(response => response.json())
        
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

    useEffect(() => {
        updateDepartmentsOption()
    }, [props.show])

    useEffect(() => {
        if(props.student == null){
            console.log(props.student);
            setStudentFirstName("");
            setStudentLastName("");
            setStudentSID("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.student);
            setStudentFirstName(props.student.first_name);
            setStudentLastName(props.student.last_name);
            setStudentSID(props.student.student_id);
            reset(props.student);
        }
    }, [props.student])
    return (
        <div id="StudentModal-div">
            <p><strong>StudentModal</strong> </p>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop={props.backdrop}
                title= {props.title}
                

                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Container>
                        <Row>
                            <Col xs={12} md={11}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {props.title}
                                </Modal.Title>
                            </Col>
                            <Col xs={6} md={1}>
                                <Button onClick={handleClose} className="btn btn-dark">取消</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup key="first_name">
                            <InputGroup.Text id="first_name">名字</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入名字"
                                aria-label="first_name"
                                aria-describedby="first_name"
                                defaultValue={studentFirstName}
                                {...register("first_name")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="last_name">
                            <InputGroup.Text id="last_name">姓氏</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入姓氏"
                                aria-label="last_name"
                                aria-describedby="last_name"
                                defaultValue={studentLastName}
                                {...register("last_name")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="student_id">
                            <InputGroup.Text id="student_id">學號</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入學號"
                                aria-label="student_id"
                                aria-describedby="student_id"
                                defaultValue={studentSID}
                                readOnly={readOnly}
                                {...register("student_id")}
                                
                            />
                        </InputGroup>
                        <br />
                        {generateFormComps(selectDBSource)}
                        <br />
                        <Button type="submit" className="btn btn-dark">
                            送出
                        </Button>
                        <Button onClick={()=>{
                                    setValue("first_name","");
                                    setValue("last_name","");
                                    setValue("student_id","");
                                }} className="btn btn-dark">清空</Button>
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col xs={12} md={11}>

                            </Col>
                            <Col xs={6} md={1}>
                                <Button onClick={handleClose} className="btn btn-dark">取消</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
