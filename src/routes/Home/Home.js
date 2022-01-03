import React, {useRef} from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AfterBoxList from "../../components/Home/AfterBoxList";
import ToDoBoxList from "../../components/Home/ToDoBoxList";
import Memo from "../../components/Home/Memo";
import WeeklyBoxList from "../../components/Home/WeeklyBoxList";
import "./Home.css";

function Home() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const childRef = useRef(null);

    const refreshAfterBoxList = () => {
        childRef.current.getAfterBoxList();
    }

    return <div className = "home-layout">
            <div className = "home-layout__wrap">
                <div className = "home-layout__wrap__left">
                    <WeeklyBoxList 
                        accessToken = {accessToken}
                        userId = {userId}
                        refreshAfterBoxList = {refreshAfterBoxList}
                        />
                    <AfterBoxList 
                        accessToken = {accessToken}
                        userId = {userId}
                        ref = {childRef}
                        />
                </div>
                <div className = "home-layout__wrap__right">
                    <DndProvider backend={HTML5Backend}>
                        <ToDoBoxList 
                            accessToken = {accessToken}
                            userId = {userId}
                            />
                    </DndProvider>
                    <Memo 
                        accessToken = {accessToken}
                        userId = {userId}
                        />
                </div>
            </div>
        </div>;
}



export default Home;