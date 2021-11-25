import React from "react";
import AfterHst from "../../components/History/AfterHst";
import ToDoHstList from "../../components/History/ToDoHstList";
import "./HstBox.css";


class HstBox extends React.Component {
    render() {
        return <div className = "HstBox-layout">
            <ToDoHstList/>
            <AfterHst/>
        </div>;
    }
}
export default HstBox;