import React, { forwardRef, useState } from "react";
import {faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./AfterBox.css";
import axios from "axios";

function AfterBox({id, title, weeklyElmList}) {
    return <div className="afterBox">
        <h1 className="afterBox_title">{title}</h1>
        <ul className="afterBox_elmList">
            {weeklyElmList.map(elm => {
                if(elm.content == null) elm.content = "";
                if(elm.completed)
                    return <li key={elm.id}>
                        <FontAwesomeIcon className="faChevronRight" icon={faChevronRight} />
                        <h2 className="afterElm_content">{elm.content}</h2>
                    </li>;
                else 
                    return null;
            })}
        </ul>
    </div>
}

AfterBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string
};

export default AfterBox;