import React, { forwardRef, useState } from "react";
import { faCheck, faPlus, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./WeeklyBox.css";
import axios from "axios";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function WeeklyBox({id, title, weeklyElmList}) {
    const baseUrl = "http://localhost:8080";

    const [titleTxt, setTitleTxt] = useState(title === null ? "" : title);
    const [weeklyElms, setWeeklyElms] = useState(weeklyElmList);
    const [editingYn, setEditingYn] = useState(false);
    
    function changeTitleTxt(e) {
        e.preventDefault();
        setTitleTxt(e.target.value);
    }

    function changeElmTxt(e, id) {
        e.preventDefault();
        setWeeklyElms(weeklyElms.map(elm=>
            elm.id === id ? { ...elm, content: e.target.value } : elm));
    }

    const onClickClearBtn = async (weeklyElmId) => {
        await axios
            .patch(baseUrl + "/weeklyElm/" + weeklyElmId, {})
            .then((response) => {
                console.log(response.data);
                
                setWeeklyElms(weeklyElms.map(elm=> elm.id === weeklyElmId ? { ...elm, completed: !elm.completed } : elm));
            })
            .catch((error) => {console.error(error);});
    }

    const onUpdateWeeklyBoxTitle = async (e) => {
        await axios
            .put(baseUrl + "/weeklyBox/" + id, 
                {
                    title: titleTxt
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {console.error(error);});
        console.log("타이틀이 수정되었습니다.");
    }

    const onDeleteWeeklyBox = async () => {
        await axios
            .delete(baseUrl + "/weeklyBox/" + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {console.error(error);});

        console.log("WeeklyBox: " + id + " deleted.");
    }

    const onCreateWeeklyElmObj = async () => {
        await axios
            .post(baseUrl + "/weeklyBox/" + id, {})
            .then((response) => {
                // response.data로 새로 생성된 weekly element의 id가 옴
                console.log("weekly elm " + response.data + "가 생성되었습니다.");
                const elm = {
                    id: response.data,
                    content: "",
                    completed: false
                };
                setWeeklyElms([...weeklyElms, elm]);
            })
            .catch((error) => {console.error(error);});
    }

    const onUpdateWeeklyElm = async (e, weeklyElmId) => {
        await axios
            .put(baseUrl + "/weeklyElm/" + weeklyElmId, 
            {
                content: e.target.value
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {console.error(error);});
        // e.target.blur();
        console.log("위클리내용이 수정됨.");
    }

    const onDeleteWeeklyElm = async (weeklyElmId) => {
        if(editingYn){
            await axios
            .delete(baseUrl + "/weeklyElm/" + weeklyElmId)
            .then((response) => {
                console.log(response.data);
                setWeeklyElms(weeklyElms.filter((elm) => elm.id !== weeklyElmId));
            })
            .catch((error) => {console.error(error);});

        console.log("Weekly Element: " + weeklyElmId + " deleted.");
        }
    }

    return <div className="weeklyBox">
    <form>
        <ul className="weeklyBox__elm-list">
            {weeklyElms.map(elm => {
                if(elm.content == null) elm.content = "";
            
                return <li key={elm.id}>
                    <button className={editingYn ? "circleBorderBtn editingCircleBorderBtn" : "circleBorderBtn"} type="button"></button>
                    <FontAwesomeIcon className={
                            editingYn
                             ? "faCheck invisible"
                             : elm.completed ? "faCheck completed" : "faCheck"
                        } icon={faCheck} onClick={()=>onClickClearBtn(elm.id)}/>
                    <FontAwesomeIcon className={editingYn ? "faMinus visible" : "faMinus invisible"} icon={faMinus} 
                        onClick={()=>onDeleteWeeklyElm(elm.id)}/>

                    <input type="text" className={ elm.completed ? "elmInputCompleted" : null } value = {elm.content} 
                        onChange={(e) => changeElmTxt(e, elm.id)} 
                        onKeyPress={onEnterKeyPressBlur}
                        onBlur={(e) => onUpdateWeeklyElm(e, elm.id)}/> 
                </li>;
            })}
        </ul>
    </form>
</div>;
}

WeeklyBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string
};

export default WeeklyBox;