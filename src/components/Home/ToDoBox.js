import React, { useEffect, useRef, useState} from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
// import autosize from 'autosize';
import "./ToDoBox.css";

function ToDoBox({id, title, fixed, toDoElmList}) {

    // function handleKeyDown(e) {
    //     // Reset field height
    // e.target.style.height = 'inherit';

    // // Get the computed styles for the element
    // const computed = window.getComputedStyle(e.target);

    // // Calculate the height
    // const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
    //              + parseInt(computed.getPropertyValue('padding-top'), 10)
    //              + e.target.scrollHeight
    //              + parseInt(computed.getPropertyValue('padding-bottom'), 10)
    //              + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    // e.target.style.height = `${height}px`;
    //     // In case you have a limitation
    //     // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    // };

    return <div className="toDoBox">
        <form>
            <div className="toDoBox__title">
                {/* <div className="toDoBox__title-tag"></div> */}
                <input type="text" value={ title }/>
            </div>
            <ul className="toDoBox__elm-list">
                {toDoElmList.map(elm => {
                   return <li>
                        <button className="checkBtn" type="button">
                            
                        </button>
                        <FontAwesomeIcon className="faCheck" icon={faCheck} />
                        {/* <textarea type="text" value = {elm.content} name="text" 
                            oninput='this.style.height = "";this.style.height = this.scrollHeight + 30+ "px"'></textarea> */}
                        {/* <textarea type="text" value = {elm.content} onKeyDown={handleKeyDown} /> */}
                        <input type="text" value = {elm.content}/>
                        
                    </li>;
                })}
            </ul>
        </form>


        
    </div>;
};

ToDoBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    fixed: PropTypes.bool.isRequired
};

export default ToDoBox;


