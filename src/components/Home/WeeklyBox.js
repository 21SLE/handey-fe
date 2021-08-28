import React from "react";
import PropTypes from "prop-types";

function WeeklyBox({id, title}) {
    return <div className="weeklyBox">
        <input className="weeklyBox__title" type="text" value={title}/>

        
    </div>;
}

WeeklyBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string
};

export default ToDoBox;