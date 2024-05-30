import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import { set, useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";

import { createBook, updateBook } from "../controller/BookController";

export const BookModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource_class , setSelectDBSource_class ] = React.useState(null);

    const [bookName, setBookName] = React.useState(null);
    const [bookIsbn, setBookIsbn] = React.useState(null);
    const [bookPublish, setBookPublish] = React.useState(null);
    const [bookAuthor, setBookAuthor] = React.useState(null);
    const [bookState, setBookState] = React.useState(null);
    const [readOnly , setReadOnly]  = React.useState("noReadOnly");

    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("author_id","");
            setValue("class_id","");
            setValue("name","");
            setValue("isbn","");
            setValue("publish","");
            setValue("state","");
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
            resJson = await createBook(data.name, data.isbn, data.publish, data.author_id, data.class_id, data.state)
        }else if(props.mode == "update"){
            let updateBookObj = {
                "name":data.name,
                "isbn":data.isbn,
                "publish":data.publish,
                "author_id":data.author_id,
                "class_id":data.class_id,
                "state":data.state
            }
            resJson = await updateBook(data.id, updateBookObj)
        }
        if(resJson.message == null 
            || (resJson.message == "修改成功" && props.mode == "update")){
            props.onHide();
            reset();
            setFormRequired(null);
            props.refreshtable();

        }else{
            console.log(resJson.message);
            if(props.mode == "create"){
                alert("新增書籍失敗");
            }else if(props.mode == "update"){
                alert("修改書籍失敗");
            }else{
                alert("失敗");
            }
        }
    }
    const handleClose = () => {
        console.log('close');
        props.onHide();
        props.setBook(null);
        console.log(props.book);
        setBookName("");
        setBookIsbn("");
        setBookPublish("");
        setBookState("在架");
        setFormRequired(null);
    }
    async function updateClassesOption(){
        let resJson = await getClasses();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);
        
        let options = [];
        resJson.forEach(element => {
            options.push({
                "name":element.name,
                "value":element.id
            })
        });
        let classesOption = {
            "key":"class_id",
            "option":options,
            "label":"類別",
        };
        console.log(classesOption);
        setSelectDBSource_class(classesOption);
    }
    function getClasses(){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: 'no-cors'
        };
        const uri = "http://localhost:8080/classes"
        
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
        updateClassesOption()
    }, [props.show])
    
    useEffect(() => {
        if(props.book == null){
            console.log(props.book);
            setBookName("");
            setBookIsbn("");
            setBookPublish("");
            setBookAuthor("");
            setBookState("在架");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.book);
            setBookName(props.book.name);
            setBookIsbn(props.book.isbn);
            setBookPublish(props.book.publish);
            setBookAuthor(props.book.Author.name);
            setBookState(props.book.state);
            reset(props.book);
        }
    }, [props.book])
    return (
        <div id="BookModal-div">
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop={props.backdrop}
                title= {props.title}

                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: '#607274', color: '#fff' }}>
                    <Container>
                        <Row>
                            <Col xs={12} md={11}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {props.title}
                                </Modal.Title>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#DED0B6'}}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup key="name">
                            <InputGroup.Text id="name">書名</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入書名"
                                aria-label="name"
                                aria-describedby="name"
                                defaultValue={bookName}
                                {...register("name")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="isbn">
                            <InputGroup.Text id="isbn">ISBN</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入ISBN"
                                aria-label="isbn"
                                aria-describedby="isbn"
                                defaultValue={bookIsbn}
                                {...register("isbn")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="publish">
                            <InputGroup.Text id="publish">出版社</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入出版社"
                                aria-label="publish"
                                aria-describedby="publish"
                                defaultValue={bookPublish}
                                {...register("publish")} 
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="author">
                            <InputGroup.Text id="author">作者</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入作者"
                                aria-label="author"
                                aria-describedby="author"
                                defaultValue={bookAuthor}
                                {...register("author")} 
                            />
                        </InputGroup>
                        <br />
                        {generateFormComps(selectDBSource_class)}
                        <br />
                        <InputGroup key="state">
                            <InputGroup.Text id="state">狀況</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入書籍現狀"
                                aria-label="state"
                                aria-describedby="state"
                                defaultValue={bookState}
                                {...register("state")} 
                            />
                        </InputGroup>
                        <br />
                        <Button type="submit" className="ButtonStyle">
                            送出
                        </Button>
                        <Button onClick={()=>{
                                    setValue("name","");
                                    setValue("isbn","");
                                    setValue("publish","");
                                    setValue("state","");

                                }}className="ButtonStyle">清空</Button>
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#607274'}}>
                    <Container>
                        <Row>
                            <Col xs={12} md={11}>

                            </Col>
                            <Col xs={6} md={1}>
                                <Button onClick={handleClose} className="ButtonStyle">取消</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
