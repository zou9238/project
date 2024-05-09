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

import { createBook, updateBook } from "../controller/BookController";

export const BookModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource, setSelectDBSource] = React.useState(null);

    const [bookFirstName, setBookFirstName] = React.useState(null);
    const [bookLastName, setBookLastName] = React.useState(null);
    const [bookSID, setBookSID] = React.useState(null);
    const [readOnly, setReadOnly] = React.useState("noReadOnly");
    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("first_name","");
            setValue("last_name","");
            setValue("book_id","");
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
            resJson = await createBook(data.first_name, data.last_name, data.book_id, data.department_id)
        }else if(props.mode == "update"){
            let updateBookObj = {
                "first_name":data.first_name,
                "last_name":data.last_name,
                "book_id":data.book_id,
                "department_id":data.department_id
            }
            resJson = await updateBook(data.id, updateBookObj)
        }
        if(resJson.message == null 
            || (resJson.message == "Update books Susseccfully" && props.mode == "update")){
            props.onHide();
            reset();
            setFormRequired(null);
            props.refreshtable();

        }else{
            console.log(resJson.message);
            if(props.mode == "create"){
                alert("Create Book Failed");
            }else if(props.mode == "update"){
                alert("Update Book Failed");
            }else{
                alert("Failed");
            }
        }
    }
    const handleClose = () => {
        console.log('close');
        props.onHide();
        props.setBook(null);
        console.log(props.book);
        setBookFirstName("");
        setBookLastName("");
        setBookSID("");
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
        if(props.book == null){
            console.log(props.book);
            setBookFirstName("");
            setBookLastName("");
            setBookSID("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.book);
            setBookFirstName(props.book.first_name);
            setBookLastName(props.book.last_name);
            setBookSID(props.book.book_id);
            reset(props.book);
        }
    }, [props.book])
    return (
        <div id="BookModal-div">
            <p><strong>BookModal</strong> </p>
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
                                defaultValue={bookFirstName}
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
                                defaultValue={bookLastName}
                                {...register("last_name")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="book_id">
                            <InputGroup.Text id="book_id">學號</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入學號"
                                aria-label="book_id"
                                aria-describedby="book_id"
                                defaultValue={bookSID}
                                readOnly={readOnly}
                                {...register("book_id")}
                                
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
                                    setValue("book_id","");
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
