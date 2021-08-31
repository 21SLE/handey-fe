import React, {useEffect} from "react";
import ToDoBoxList from "../../components/Home/ToDoBoxList";
import WeeklyBoxList from "../../components/Home/WeeklyBoxList";
import "./Home.css";

class Home extends React.Component {
    

    render() {

        return <div className = "home-layout">
            <div className = "home-layout__wrap">
                <WeeklyBoxList />
                <ToDoBoxList />
            </div>
        </div>;
    }
}



export default Home;