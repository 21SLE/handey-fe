import React from "react";
import PropTypes from "prop-types";
import "./ToDoBox.css";

function ToDoBox({id, title, fixed}) {

    


    return <div className="toDoBox">

    </div>;
}

ToDoBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    fixed: PropTypes.bool.isRequired
};

export default ToDoBox;