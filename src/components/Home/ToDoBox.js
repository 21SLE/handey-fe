import React, { useEffect, useRef, useState} from "react";
import { faCheck, faList, faPlus, faThumbtack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
// import autosize from 'autosize';
import "./ToDoBox.css";
import axios from "axios";
import ToDoBoxList from "./ToDoBoxList";

function ToDoBox({id, title, fixed, toDoElmList}) {
    const baseUrl = "http://localhost:8080";

    const [titleTxt, setTitleTxt] = useState(title);
    const [fixedColor, setFixedColor] = useState('#4b4b4b');
    const inputTitle = useRef();
    const fixedIcon = useRef();

    function changeTitleTxt(e) {
        e.preventDefault();
        setTitleTxt(e.target.value);
    }

    const updateFixedYn = () => {
        const updateFixedYn = async () => {
            await axios
                    .patch(baseUrl + "/toDoBox/" + id, {})
                    .then((response) => {
                        console.log(response.data);

                    })
                    .catch((error) => {console.error(error);});
        }
        updateFixedYn();
        console.log("고정 상태가 변경되었습니다.");
    }

    const updateToDoBoxTitle = (e) => {
        // e.preventDefault();
        if(e.key == 'Enter') {
            const updateToDoBoxTitle = async () => {
                await axios
                    .put(baseUrl + "/toDoBox/" + id, 
                        {
                            title: titleTxt
                        })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {console.error(error);});
            }
            updateToDoBoxTitle();
            inputTitle.current.blur();
            console.log("타이틀이 수정되었습니다.");
        } else {
            setTitleTxt(e.target.value);
        }
    }

    return <div className="toDoBox">
        <form>
            <div className="toDoBox_menu">
                <FontAwesomeIcon className={fixed ? "fa faThumbtack fixed" : "fa faThumbtack"} icon={faThumbtack} 
                    ref={fixedIcon} onClick={()=> {updateFixedYn(); setFixedColor(fixedColor == '#f5bc0f' ? '#4b4b4b' : '#f5bc0f');}} style={{color: `${fixedColor}`}}/>
                <FontAwesomeIcon className="fa faList" icon={faList} />
                <FontAwesomeIcon className="fa faPlus" icon={faPlus} />
                <FontAwesomeIcon className="fa faTrash" icon={faTrash} />
            </div>
            <div className="toDoBox__title">
                {/* <div className="toDoBox__title-tag"></div> */}
                <input type="text" value={ titleTxt } ref={inputTitle} onChange={changeTitleTxt} onKeyPress={updateToDoBoxTitle}/>
                {/* <input type="text" value={ titleTxt } onChange={changeTitleTxt} onKeyPress={updateToDoBoxTitle}/> */}
                
            </div>
            <ul className="toDoBox__elm-list">
                {toDoElmList.map(elm => {
                    if(elm.content == null) elm.content = "";
                    

                    return <li>
                        <button className="checkBtn" type="button">
                            
                        </button>
                        <FontAwesomeIcon className="faCheck" icon={faCheck} />
                    
                        <input type="text" value = {elm.content} />
                        
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


