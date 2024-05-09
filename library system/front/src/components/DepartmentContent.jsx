import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import {InputGroup} from "react-bootstrap";


export const DepartmentContent = (props) => {
    //const [student, setStudent] = React.useState(null);
    const [selectDBSource, setSelectDBSource] = React.useState(null);
    const [selectSource, setSelectSource] = React.useState(
        {
            key:"departments",
            "option":[
                {
                    "name":"資訊工程系",
                    "value":"CSIE"
                },
                {
                    "name":"資訊管理系",
                    "value":"IM"
                },
                {
                    "name":"企業管理系",
                    "value":"BA"
                },
                {
                    "name":"國際貿易系",
                    "value":"IB"
                }
            ],
            "label":"科系所",
        }
    );
    const { register, handleSubmit, watch, reset } = useForm();
    const onSubmit = (data) => {
        
        console.log(data);
        
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
            "key":"departments2",
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
    useEffect(() => {
        updateDepartmentsOption()
    }, [])

    return (
        <div id="SelectCourseListContent-div">
            <p><strong>SelectCourseListContent</strong> </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="horizontal" gap={3}>
                    <Form.Select className="w-25"  {...register("selectedType")}>
                        <option value="CSIE">資訊工程系</option>
                        <option value="IM">資訊管理系</option>
                        <option value="BA">企業管理系</option>
                    </Form.Select >
                    <br/>
                    {generateFormComps(selectSource)}
                    {generateFormComps(selectDBSource)}
                    <Button type="submit" className="btn btn-dark">確定</Button>
                </Stack>
            </Form>
            
            
            
        </div>
    );
    
    
    }

