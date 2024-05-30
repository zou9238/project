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
import moment from 'moment';

import { createBorrow_list, updateBorrow_list  } from "../controller/Borrow_listController";

export const Borrow_listModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource_book, setSelectDBSource_book] = React.useState(null);
    const [selectDBSource_user, setSelectDBSource_user] = React.useState(null);
    const [borrow_listBookId, setBorrow_listBookId] = React.useState(null);
    const [borrow_listUserId, setBorrow_listUserId] = React.useState(null);
    const [borrow_listExpiration, setBorrow_listExpiration] = React.useState(null);
    const [readOnly, setReadOnly] = React.useState("noReadOnly");
    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("book_id","");
            setValue("user_id","");
            //當天日期+7天
            setValue("expiration",moment().add(7,'days').format('YYYY-MM-DD'));
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
            resJson = await createBorrow_list(data.book_id, data.user_id, data.expiration)
        }else if(props.mode == "update"){
            let updateBorrow_listObj = {
                "book_id":data.book_id,
                "user_id":data.user_id,
                "expiration":data.expiration
            }
            resJson = await updateBorrow_list(data.id, updateBorrow_listObj)
        }
        if(resJson.message == null|| (resJson.message == "更新成功" && props.mode == "update")){
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
        props.setBorrow_list(null);
        console.log(props.borrow_list);
        setBorrow_listBookId("");
        setBorrow_listUserId("");
        setBorrow_listExpiration("");
        setFormRequired(null);
    }
    async function updateUsersOption(){
        let resJson = await getUsers();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);

        let options = [];
        resJson.forEach(element => {
            options.push({
                "name":element.name,
                "value":element.id,
            })
        });
        let userOption = {
            "key":"user_id",
            "option":options,
            "label":"借閱人",
        };
        console.log(userOption);
        setSelectDBSource_user(userOption);
    }

    function getUsers(){
        const headers = new Headers();
        const options = {
            method:'GET',
            headers:headers,
        }
        const url = "http://localhost:8080/users";
        
        return fetch(url,options).then(res => res.json());

    }

    async function updateBookOption(){
        let resJson = await getBooks();
        resJson.forEach(element => {
            console.log(element);
        });
        console.log(resJson);

        let options = [];
        resJson.forEach(element => {
            options.push({
                "name":element.name+ "(" +element.isbn + ")"+element.state,
                "value":element.id,
            })
        });
        let bookOption = {
            key:"book_id",
            "option":options,
            "label":"書名",
        };
        console.log(bookOption);
        setSelectDBSource_book(bookOption);
    }
    function getBooks(){
        const headers = new Headers();
        const options = {
            method:'GET',
            headers:headers,
        }
        const url = "http://localhost:8080/books";

        return fetch(url,options).then(res => res.json());

    }

    const generateFormComps = (obj) => {
        if(!obj) return null;
        const {key, option, label} = obj;

        return(
            <InputGroup key={key}>
                <InputGroup.Text id={key}>{label}</InputGroup.Text>
                <Form.Select aria-label={key} aria-describedby={key} {...register(key)}>
                {
                    option.map(({name, value}) => <option value={value} key={value}>{name}</option>)
                }
                </Form.Select>
            </InputGroup>
        );
    }        

    useEffect(() => {
        updateUsersOption()
    }, [props.show])


    useEffect(() => {
        updateBookOption()
    }, [props.show])

    useEffect(() => {
        if(props.borrow_list == null){
            console.log(props.borrow_list);
            setBorrow_listBookId("");
            setBorrow_listUserId("");
            setBorrow_listExpiration("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.borrow_list);
            setBorrow_listBookId(props.borrow_list.book_id);
            setBorrow_listUserId(props.borrow_list.user_id);
            setBorrow_listExpiration(props.borrow_list.expiration);

            reset(props.borrow_list);
        }
    }, [props.borrow_list])
    return(
        <div id="Borrow_listModal-div">
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
                        <InputGroup key="book_id">
                            {generateFormComps(selectDBSource_book)}
                        </InputGroup>
                        <br />
                        <InputGroup key="user_id">
                            {generateFormComps(selectDBSource_user)}
                        </InputGroup>
                        <br />
                        <InputGroup key="expiration">
                            <InputGroup.Text id="expiration">歸還時間</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入歸還時間"
                                aria-label="expiration"
                                aria-describedby="expiration"
                                defaultValue={borrow_listExpiration}
                                {...register("expiration")}
                            />
                        </InputGroup>
                        <br />
                        <Button type="submit" className="ButtonStyle">
                            送出
                        </Button>
                        <Button  onClick={()=>{
                                    setValue("book_id","");
                                    setValue("user_id","");
                                    setValue("expiration","");
                                }} className="ButtonStyle">清空</Button>
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col xs={12} md={11}>

                            </Col>
                            <Col xs={6} md={1}>
                                <Button  onClick={handleClose} className="ButtonStyle">取消</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
