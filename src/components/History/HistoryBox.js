import React, { forwardRef, useState} from "react";
import { faCheck, faList, faPlus, faThumbtack, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./HistoryBox.css";
import axios from "axios";

function HistoryBox({date, toDoBoxList, afterList}) {
    return <div className="historyBox">
        <div className="date">{date}</div>
        <ul className="toDoBoxList_history">
            {
                toDoBoxList.map(box => {
                    return <li key={box.id}>
                        <div className="toDoBox_history_title">
                            {box.title}
                        </div>
                        <ul className="toDoElmList_history">
                            {
                                box.toDoElmHstList.map(elm => {
                                    return <li key={elm.id}>
                                        <div className="toDoElm_history_content">{elm.content}</div>
                                    </li>
                                }
                                )
                            }
                        </ul>
                        </li>
                })
            }
        </ul>
        <div className="afterList_history">

        </div>
    </div>
}

HistoryBox.propTypes = {
    date: PropTypes.string,
};

export default HistoryBox;