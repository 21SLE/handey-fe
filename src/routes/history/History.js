import React from "react";
import "./History.css";
import HistoryBoxList from "../../components/History/HistoryBoxList";


function History() {
    
    return <div className = "history-layout">
            <div className = "history-layout__wrap">
                <div className = "history-layout__wrap__search">
                        
                </div>
                <HistoryBoxList />
            </div>
        </div>;
}

export default History;