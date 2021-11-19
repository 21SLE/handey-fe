import React from "react";
import HstBoxList from "../../components/History/HstBoxList";
import Search from "../../components/History/Search";
import "./history.css";


class History extends React.Component {   
    render() {

        return <div className = "history-layout" style={{paddingLeft: "280px"}}>
            <div className = "history-layout__wrap">
                    <div className = "history-layout__wrap__search">
                        <Search/>
                    </div>
                    <div className = "history-layout__wrap__main">
                        <HstBoxList/>
                    </div>
            </div>
        </div>;
    }
}
export default History;