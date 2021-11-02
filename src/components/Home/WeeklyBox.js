import React, { forwardRef, useState } from "react";
import { faCheck, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./WeeklyBox.css";
import axios from "axios";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

function refreshPage() {
    window.location.reload(false);
}

function WeeklyBox({id, title, weeklyElmList}) {
    const baseUrl = "http://localhost:8080";

    //const [titleTxt, setTitleTxt] = useState(title === null ? "" : title);
    const [weeklyElms, setWeeklyElms] = useState(weeklyElmList);
    

    const onClickClearBtn = async (weeklyElmId) => {
        await axios
            .patch(baseUrl + "/weeklyElm/" + weeklyElmId, {})
            .then((response) => {
                console.log(response.data);
                
                setWeeklyElms(weeklyElms.map(elm=> elm.id === weeklyElmId ? { ...elm, completed: !elm.completed } : elm));
            })
            .catch((error) => {console.error(error);});
    }

    return <div className="weeklyBox">
    <form>
        <div className="weeklyBox_menu">
            <FontAwesomeIcon className="fa faList" icon={faList} 
                onClick={() => setEditingYn(!editingYn)}/>
            <FontAwesomeIcon className="fa faPlus" icon={faPlus} 
                onClick={()=>{onCreateWeeklyElmObj();}}/>
        </div>
        <div className="weeklyBox__title">
            <input type="text" value={ titleTxt } 
            onChange={changeTitleTxt} 
            onKeyPress={onEnterKeyPressBlur}
            onBlur={(e)=>onUpdateWeeklyBoxTitle(e)}
            />         
        </div>
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