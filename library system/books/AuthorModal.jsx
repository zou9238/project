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
import { createAuthor, updateAuthor} from "../controller/AuthorController";

export const AuthorModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource, setSelectDBSource] = React.useState(null);
    const [authorName, setAuthorName] = React.useState(null);
    const [readOnly, setReadOnly] = React.useState("noReadOnly");
    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("name","");
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
            resJson = await createAuthor(data.name)
        }else if(props.mode == "update"){
            let updateAuthorObj = {
                "name":data.name,
            }
            resJson = await updateAuthor(data.id, updateAuthorObj)
        }
        if(resJson.message == null 
            || (resJson.message == "Update authors Susseccfully" && props.mode == "update")){
            props.onHide();
            reset();
            setFormRequired(null);
            props.refreshtable();

        }else{
            console.log(resJson.message);
            if(props.mode == "create"){
                alert("新增失敗");
            }else if(props.mode == "update"){
                alert("修改失敗");
            }else{
                alert("失敗");
            }
        }
    }
    const handleClose = () => {
        console.log('close');
        props.onHide();
        props.setAuthor(null);
        console.log(props.author);
        setAuthorName("");
        setFormRequired(null);
    }

    useEffect(() => {
        if(props.author == null){
            console.log(props.author);
            setAuthorName("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.author);
            setAuthorName(props.author.name);
            reset(props.student);
        }
    }, [props.student])
    return (
        <div id="AuthorModal-div">
            <p><strong>AuthorModal</strong> </p>
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
                        <InputGroup key="name">
                            <InputGroup.Text id="name">名字</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入作者名字"
                                aria-label="name"
                                aria-describedby="name"
                                defaultValue={authorName}
                                {...register("name")}
                            />
                        </InputGroup>
                        <Button type="submit" className="btn btn-dark">
                            送出
                        </Button>
                        <Button onClick={()=>{
                                    setValue("name","");
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
