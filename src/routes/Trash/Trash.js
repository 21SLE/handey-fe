import React from "react";
import TrashBoxList from "../../components/Trash/TrashBoxList"

class Trash extends React.Component {
    

    render() {

        return <div className = "trash-layout" style={{paddingLeft: "280px"}}>
        
        <span>this is trash screen</span>
        <TrashBoxList/>

    </div>;
    }
}



export default Trash;