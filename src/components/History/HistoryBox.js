import React from "react";
import PropTypes from "prop-types";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HistoryBox.css";

function HistoryBox({date, toDoBoxList, afterList}) {
    var dateStr = date.replace(/-/g, '.');
    return <div className="historyBox">
        <div className="date">{dateStr}</div>
        <hr />
        <h2 className="sectionTitle">Todo</h2>
        {/* <hr /> */}
        <ul className="toDoBoxList_history">
            {toDoBoxList.map(box => {
                return <li key={box.id}>
                    <div  className="toDoBox_history_title_section">
                        <FontAwesomeIcon className="faCheck" icon={faCheck}/>
                        <div className="boxTitle">
                            {box.title}
                        </div>
                    </div>
                    <ul className="toDoElmList_history">
                        {box.toDoElmHstList.map(elm => {
                            return <li key={elm.id}>
                                {/* <FontAwessomeIcon className="faChevronRight" icon={faChevronRight} /> */}
                                <div className="elm_dot">-</div>
                                <div className="elm_content">{elm.content}</div>
                            </li>
                        })}
                    </ul>
                </li>
            })}
        </ul>
        <div className="afterList_history_section">
            <h2 className="sectionTitle">Weekly</h2>
            {/* <hr /> */}
            <ul className="afterList_history">
            {afterList.map(afterHistory => {
                return afterHistory.subtitle
                    ? <li key={afterHistory.id} className="afterTitle">
                        <FontAwesomeIcon className="faCheck" icon={faCheck}/>
                        <div className="boxTitle">{afterHistory.content}</div>
                    </li>
                    : <li key={afterHistory.id} className="afterElmList_history">
                        <div className="elm_dot">-</div>
                        <div className="elm_content">{afterHistory.content}</div>
                    </li>
            })}
            </ul>
        </div>
    </div>
}

HistoryBox.propTypes = {
    date: PropTypes.string,
};

export default HistoryBox;