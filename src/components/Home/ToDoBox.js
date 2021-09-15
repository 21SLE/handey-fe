import React, { forwardRef, useContext, useRef, useState} from "react";
import { faCheck, faList, faPlus, faThumbtack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./ToDoBox.css";
import axios from "axios";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

function ToDoBox({id, title, fixed, toDoElmList, deleteToDoBoxOnScreen}) {
    const baseUrl = "http://localhost:8080";

    const [titleTxt, setTitleTxt] = useState(title);
    const [fixedColor, setFixedColor] = useState(fixed ? '#f5bc0f' : '#4b4b4b');
    const inputTitle = useRef();

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

    const onUpdateToDoBoxTitle = (e) => {
        // e.preventDefault();
        if(e.key === 'Enter') {
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

    const onDeleteToDoBox = () => {
        const deleteToDoBox = async () => {
            await axios
                    .delete(baseUrl + "/toDoBox/" + id)
                    .then((response) => {
                        console.log(response.data);
                        deleteToDoBoxOnScreen(id);
                    })
                    .catch((error) => {console.error(error);});
        }
        deleteToDoBox();
        console.log("ToDoBox: " + id + " deleted.");
    }

    return <div className="toDoBox">
        <form>
            <div className="toDoBox_menu">
                <FontAwesomeIcon className={fixed ? "fa faThumbtack fixed" : "fa faThumbtack"} icon={faThumbtack} 
                    onClick={()=> {updateFixedYn(); setFixedColor(fixedColor === '#f5bc0f' ? '#4b4b4b' : '#f5bc0f');}} 
                    style={{color: `${fixedColor}`}}/>
                <FontAwesomeIcon className="fa faList" icon={faList} />
                <FontAwesomeIcon className="fa faPlus" icon={faPlus} />
                <FontAwesomeIcon className="fa faTrash" icon={faTrash}
                    onClick={()=> {onDeleteToDoBox();}}  />
            </div>
            <div className="toDoBox__title">
                {/* <div className="toDoBox__title-tag"></div> */}
                <Input ref = {inputTitle} value={ titleTxt } onChange={changeTitleTxt} onKeyPress={onUpdateToDoBoxTitle}/>         
            </div>
            <ul className="toDoBox__elm-list">
                {toDoElmList.map(elm => {
                    if(elm.content == null) elm.content = "";
                
                    return <li key={elm.id}>
                        <button className="checkBtn" type="button">
                            
                        </button>
                        <FontAwesomeIcon className="faCheck" icon={faCheck} />
                    
                        <input type="text" value = {elm.content} onChange={()=>{}}/>
                        
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


