import React from "react";
import TrashBoxList from "../../components/Trash/TrashBoxList"
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Trash.css"

function Trash() {
    return <div className = "trash-layout">
        <div className="trash-layout__wrap">
            <div className="warningMessage">
                <FontAwesomeIcon className="faBullhorn" icon={faBullhorn}/>
                <h1>일주일된 투두는 삭제됩니다!</h1>
            </div>
            <TrashBoxList/>
        </div>
    </div>;
}

export default Trash;