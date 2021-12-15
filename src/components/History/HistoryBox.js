import React from "react";
import PropTypes from "prop-types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HistoryBox.css";

function HistoryBox({date, toDoBoxList, fwBoxList}) {
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
            <h2 className="sectionTitle">Finished Weekly</h2>
            {/* <hr /> */}
            <ul className="afterList_history">
            {fwBoxList.map(fwBox => {
                return <li key={fwBox.id}>
                <div  className="afterTitle">
                    <div className="afterTitle">
                        <FontAwesomeIcon className="faCheck" icon={faCheck}/>
                        <div className="boxTitle">{fwBox.title}</div>
                    </div>
                </div>
                <ul className="afterElmList_history">
                    {fwBox.fwElmList.map(elm => {
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
        </div>
    </div>
}

HistoryBox.propTypes = {
    date: PropTypes.string,
};

export default HistoryBox;