import React, {useEffect} from "react";
import ToDoBoxList from "../../components/Home/ToDoBoxList";
import "./Home.css";

class Home extends React.Component {
    

    render() {

        return <div className = "home-layout">
            <ToDoBoxList />
            <span>this is home screen</span>

        </div>;
    }
}



export default Home;