import React, { forwardRef, useState} from "react";
import PropTypes from "prop-types";
import WeeklyBox from "./WeeklyBox";
import "./WeeklyBox.css";
import axios from "axios";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

function WeeklyBox({id, title}) {
    return <div className="weeklyBox">
        <input className="weeklyBox__title" type="text" value={title}/>
    </div>;
}

WeeklyBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string
};

export default WeeklyBox;