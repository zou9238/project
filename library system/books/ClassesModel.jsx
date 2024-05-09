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
import { createClass, updateClass} from "../controller/ClassesController";

export const ClassesModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource, setSelectDBSource] = React.useState(null);
    const [classesName, setClassesName] = React.useState(null);
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
            resJson = await createClass(data.name)
        }else if(props.mode == "update"){
            let updateClassObj = {
                "name":data.name,
            }
            resJson = await updateClass(data.id, updateClassObj)
        }
        if(resJson.message == null 
            || (resJson.message == "Update classes Susseccfully" && props.mode == "update")){
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
        props.setClass(null);
        console.log(props.classes);
        setClassesName("");
        setFormRequired(null);
    }

    useEffect(() => {
        if(props.classes == null){
            console.log(props.classes);
            setClassesName("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.classes);
            setClassesName(props.classes.name);
            reset(props.classes);
        }
    }, [props.classes])
    return (
        <div id="ClassesModal-div">
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
                            <InputGroup.Text id="name">類別</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入類別"
                                aria-label="name"
                                aria-describedby="name"
                                defaultValue={classesName}
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
