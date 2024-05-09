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

import { createUser, updateUser } from "../controller/UserController";

export const UserModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    
    const [userName, setUserName] = React.useState(null);
    const [userPhone_number, setUserPhoneNumber] = React.useState(null);
    const [userEmail, setUserEmail] = React.useState(null);
    const [readOnly , setReadOnly]  = React.useState("noReadOnly");

    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("name","");
            setValue("phone_number","");
            setValue("email","");
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
            resJson = await createUser(data.name, data.phone_number, data.email)
        }else if(props.mode == "update"){
            let updateUserObj = {
                "name":data.name,
                "phone_number":data.phone_number,
                "email":data.email,
            }
            resJson = await updateUser(data.id, updateUserObj)
        }
        if(resJson.message == null  
            || (resJson.message == "Update users Susseccfully" && props.mode == "update")){
            props.onHide();
            reset();
            setFormRequired(null);
            props.refreshtable();

        }else{
            console.log(resJson.message);
            if(props.mode == "create"){
                alert("新增使用者失敗");
            }else if(props.mode == "update"){
                alert("修改使用者失敗");
            }else{
                alert("失敗");
            }
        }
    }
    const handleClose = () => {
        console.log('close');
        props.onHide();
        props.setUser(null);
        console.log(props.user);
        setUserName("");
        setUserPhoneNumber("");
        setUserEmail("");
        setFormRequired(null);
    }

    useEffect(() => {
        if(props.user == null){
            console.log(props.user);
            setUserName("");
            setUserPhoneNumber("");
            setUserEmail("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.user);
            setUserName(props.user.name);
            setUserPhoneNumber(props.user.phone_number);
            setUserEmail(props.user.email);
            reset(props.user);
        }
    }, [props.user])
    return (
        <div id="userModal-div">
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
                            <InputGroup.Text id="name">姓名</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入姓名"
                                aria-label="name"
                                aria-describedby="name"
                                defaultValue={userName}
                                {...register("name")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="phone_number">
                            <InputGroup.Text id="phone_number">電話號碼</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入電話號碼"
                                aria-label="phone_number"
                                aria-describedby="phone_number"
                                defaultValue={userPhone_number}
                                {...register("phone_number")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="email">
                            <InputGroup.Text id="email">電子信箱</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入電子信箱"
                                aria-label="email"
                                aria-describedby="email"
                                defaultValue={userEmail}
                                {...register("email")}
                            />
                        </InputGroup>
                        <br />
                        <Button type="submit" className="ButtonStyle">
                            送出
                        </Button>
                        <Button onClick={()=>{
                                    setValue("name","");
                                    setValue("phone_number","");
                                    setValue("email","");

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
