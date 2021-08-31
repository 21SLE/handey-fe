import React from "react";
import PropTypes from "prop-types";
import "./ToDoBox.css";

function ToDoBox({id, title, fixed, toDoElmList}) {
    return <div className="toDoBox">
        <form>
            <div className="toDoBox__title-tag"></div>
            <input type="text" value={ title }/>
        </form>


        
    </div>;
};

ToDoBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    fixed: PropTypes.bool.isRequired
};

export default ToDoBox;