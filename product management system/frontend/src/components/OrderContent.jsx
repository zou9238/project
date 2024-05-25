import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import {InputGroup} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { SelectionContent } from "./SelectionContent";


export const OrderContent = (props) => {
    //const [order, setOrder] = React.useState(null);
    const [ordersDBSource, setOrdersDBSource] = React.useState(null);
    const [orderItem, setOrderItem] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(true);
    
    const { register, handleSubmit, watch, reset } = useForm();
    const updateCustomer = async (data) => {

        console.log(data['Customer']);
        let resJson = await getOrderItem(data['Customer'])
        console.log(resJson);
        setOrderItem(resJson);
        if(resJson.length == 0){
            alert("查無資料");
        }
    }
    const generateFormComps = (obj) => {
        if (!obj) return null;
        const { key, option, label } = obj;
            

        return (//下拉式選單
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

    
    async function updateCustomersOption(){
        let resJson = await getCustomers();
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
        let CustomerOption = {
            key:"Customer",
            option:options,
            label:"客戶"
        }
        console.log(CustomerOption);
        setOrdersDBSource(CustomerOption);
    }

    function getCustomers(){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: "no-cors"
        };
        const uri = "http://localhost:8080/customers"

        return fetch(uri, options).then(response => response.json())
    }

    function getOrderItem(Customer_id){
        const headers = new Headers()
        const options = {
            method: "GET",
            headers: headers,
            //mode: "no-cors"
        };
        const uri = "http://localhost:8080/customers/"+ Customer_id + "/orders"

        return fetch(uri, options).then(response => response.json())

    }
    
    useEffect(() => {
        updateCustomersOption()
    }, []);

    return (
        <div id="OrderContent-div">
                <Form onSubmit={handleSubmit(updateCustomer)}>
                    <Stack direction="horizontal" gap={3}>
                        {generateFormComps(ordersDBSource)}
                        <Button type="submit" className="btn btn-dark">查詢</Button>
                    </Stack>
                </Form>
                <br/>
                <SelectionContent data={orderItem}/>
        </div>
    );
}
