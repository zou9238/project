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

import { createProduct, updateProduct  } from "../controller/ProductController";

export const ProductModal = (props) => {

    const [formRequired, setFormRequired] = React.useState(null);
    const [selectDBSource, setSelectDBSource] = React.useState(null);

    const [productName, setProductName] = React.useState(null);
    const [productPrice, setProductPrice] = React.useState(null);
    const [readOnly, setReadOnly] = React.useState("noReadOnly");
    useEffect(() => {
        if(props.mode == "update"){
            setReadOnly("readOnly")
        }if(props.mode == "create"){
            setValue("name","");
            setValue("price","");
            setValue("category_id","");
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
            resJson = await createProduct(data.name, data.price, data.category_id)
        }else if(props.mode == "update"){
            let updateProductObj = {
                "name":data.name,
                "price":data.price,
                "category_id":data.category_id
            }
            resJson = await updateProduct(data.id, updateProductObj)
        }
        if(resJson.message == null || props.mode == "update"){
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
        props.setProduct(null);
        console.log(props.product);
        setProductName("");
        setProductPrice("");
        setFormRequired(null);
    }
    async function updateCategoryOption(){
        let resJson = await getCategorys();
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
        let categoryOption = {
            key:"category_id",
            "option":options,
            "label":"類別",
        };
        console.log(categoryOption);
        setSelectDBSource(categoryOption);
    }
    function getCategorys(){
        const headers = new Headers();
        const options = {
            method:'GET',
            headers:headers,
        }
        const url = "http://localhost:8080/categories";

        return fetch(url,options).then(res => res.json());

    }

    const generateFormComps = (obj) => {
        if(!obj) return null;
        const {key, option, label} = selectDBSource;

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
        updateCategoryOption()
    }, [props.show])

    useEffect(() => {
        if(props.product == null){
            console.log(props.product);
            setProductName("");
            setProductPrice("");
            reset(null);
            setFormRequired(null);
        }else{
            console.log(props.product);
            setProductName(props.product.name);
            setProductPrice(props.product.price);
            reset(props.product);
        }
    }, [props.product])
    return(
        <div id="ProductModal-div">
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
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup key="name">
                            <InputGroup.Text id="name">商品名稱</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入商品名稱"
                                aria-label="name"
                                aria-describedby="name"
                                defaultValue={productName}
                                {...register("name")}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup key="price">
                            <InputGroup.Text id="price">價格</InputGroup.Text>
                            <Form.Control
                                placeholder="請輸入價格"
                                aria-label="price"
                                aria-describedby="price"
                                defaultValue={productPrice}
                                {...register("price")}
                                
                            />
                        </InputGroup>
                        <br />
                        {generateFormComps(selectDBSource)}
                        <br />
                        <Button type="submit" className="btn btn-dark">
                            送出
                        </Button>
                        <Button onClick={()=>{
                                    setValue("name","");
                                    setValue("price","");
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
    )

}
