import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import {CourseContentDetial} from "./CourseContentDetial";

export const CourseContent = (props) => {
    const [course, setCourse] = React.useState(null);
    
    useEffect(() => {
        setCourse(props.course);
    }, [props.course]);

    function changeCourseMessage() {
        setCourse("changeCourseMessage");
        console.log("changeCourseMessage");
    }
    function  clearCourseMessage() {
        setCourse("");
        console.log("clearCourseMessage");
    }
    return (
        <div id="HomeContent-div">
            <p><strong>CourseContent</strong> </p>
            <CourseContentDetial course={course}/>
            <div className="h-4">
            <Button onClick={() => changeCourseMessage()} className="btn btn-dark">
                Change and Rerender
            </Button>
            <Button onClick={() => clearCourseMessage()} className="btn btn-dark">
                Clear and Rerender
            </Button>
            </div>
        </div>
    );
    
    
    }

