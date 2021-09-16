import React, { forwardRef, useState} from "react";
import { faCheck, faList, faPlus, faThumbtack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./ToDoBox.css";
import axios from "axios";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

function refreshPage() {
    window.location.reload(false);
}

function ToDoBox({id, title, fixed, toDoElmList, deleteToDoBoxOnScreen}) {
    const baseUrl = "http://localhost:8080";

    const [titleTxt, setTitleTxt] = useState(title);
    const [fixedColor, setFixedColor] = useState(fixed ? '#f5bc0f' : '#4b4b4b');
    const [toDoElms, setToDoElms] = useState(toDoElmList);

    function changeTitleTxt(e) {
        e.preventDefault();
        setTitleTxt(e.target.value);
    }

    function changeElmTxt(e, id) {
        e.preventDefault();
        setToDoElms(toDoElms.map(elm=>
            elm.id === id ? { ...elm, content: e.target.value } : elm));
    }

    const updateFixedYn = async () => {
        await axios
        .patch(baseUrl + "/toDoBox/" + id, {})
        .then((response) => {
            console.log(response.data);

        })
        .catch((error) => {console.error(error);});
        console.log("고정 상태가 변경되었습니다.");
    }

    const onUpdateToDoBoxTitle = async (e) => {
        // e.preventDefault();
        if(e.key === 'Enter') {
            await axios
                    .put(baseUrl + "/toDoBox/" + id, 
                        {
                            title: titleTxt
                    })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {console.error(error);});
            e.target.blur();
            console.log("타이틀이 수정되었습니다.");
        }
    }

    const onDeleteToDoBox = async () => {
        await axios
            .delete(baseUrl + "/toDoBox/" + id)
            .then((response) => {
                console.log(response.data);
                deleteToDoBoxOnScreen(id);
            })
            .catch((error) => {console.error(error);});

        console.log("ToDoBox: " + id + " deleted.");
    }

    const createToDoElmObj = async () => {
        await axios
            .post(baseUrl + "/toDoBox/" + id, {})
            .then((response) => {
                console.log(response.data);
                refreshPage();
            })
            .catch((error) => {console.error(error);});
        console.log("todo elm 객체가 생성되었습니다.");
    }

    const onUpdateToDoElm = async (e, toDoElmId) => {
        if(e.key === 'Enter') {
            await axios
                    .put(baseUrl + "/toDoElm/" + toDoElmId, 
                    {
                        content: e.target.value
                    })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {console.error(error);});
            e.target.blur();
            console.log("투두가 수정되었습니다.");
        }
    }

    return <div className="toDoBox">
        <form>
            <div className="toDoBox_menu">
                <FontAwesomeIcon className={fixed ? "fa faThumbtack fixed" : "fa faThumbtack"} icon={faThumbtack} 
                    onClick={()=> {updateFixedYn(); setFixedColor(fixedColor === '#f5bc0f' ? '#4b4b4b' : '#f5bc0f');}} 
                    style={{color: `${fixedColor}`}}/>
                <FontAwesomeIcon className="fa faList" icon={faList} />
                <FontAwesomeIcon className="fa faPlus" icon={faPlus} 
                    onClick={()=>{createToDoElmObj();}}/>
                <FontAwesomeIcon className="fa faTrash" icon={faTrash}
                    onClick={()=> {onDeleteToDoBox();}}  />
            </div>
            <div className="toDoBox__title">
                <input type="text" value={ titleTxt } onChange={changeTitleTxt} onKeyPress={onUpdateToDoBoxTitle}/>         
            </div>
            <ul className="toDoBox__elm-list">
                {toDoElms.map(elm => {
                    if(elm.content == null) elm.content = "";
                
                    return <li key={elm.id}>
                        <button className="checkBtn" type="button"></button>
                        <FontAwesomeIcon className={elm.completed ? "faCheck completed" : "faCheck"} icon={faCheck} />
                    
                        <input type="text" value = {elm.content} onChange={(e)=>changeElmTxt(e, elm.id)} onKeyPress={(e)=>onUpdateToDoElm(e, elm.id)}/> 
                    </li>;
                })}
            </ul>
        </form>
    </div>;
};

ToDoBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    fixed: PropTypes.bool.isRequired
};

export default ToDoBox;


