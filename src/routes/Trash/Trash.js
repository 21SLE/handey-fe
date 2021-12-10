import React from "react";
import TrashBoxList from "../../components/Trash/TrashBoxList"
import "./Trash.css"

function Trash() {
    return <div className = "trash-layout">
        <div className="trash-layout__wrap">
            <TrashBoxList/>
        </div>
    </div>;
}

export default Trash;