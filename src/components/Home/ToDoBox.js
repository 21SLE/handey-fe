import React, { useState } from "react";
import _ from "lodash";
import { useDrag, useDrop } from 'react-dnd';
import { faCheck, faList, faPlus, faThumbtack, faTrash, faMinus, faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { ItemTypes } from "../common/ItemTypes";
import "./ToDoBox.css";
import axios from "axios";

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function ToDoBox({accessToken, userId, id, title, index, fixed, toDoElmList, deleteToDoBoxOnScreen, moveToDoBox}) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [titleTxt, setTitleTxt] = useState(title === null ? "" : title);
    const [fixedColor, setFixedColor] = useState(fixed ? '#f5bc0f' : '#4b4b4b');
    const [toDoElms, setToDoElms] = useState(toDoElmList);
    const [editingYn, setEditingYn] = useState(false);

    const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
        type: ItemTypes.ToDoBox,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: originId, index: originIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveToDoBox(originId, originIndex, false); 
            }
        },
    }), [id, index, moveToDoBox]);

    const throttleHoverItem = _.debounce((draggedId, index, shouldCallApi)=> {
        if(draggedId === id) {
            return null;
        }
        moveToDoBox(draggedId, index, shouldCallApi)
    }, 70);

    const [, drop] = useDrop({
        accept: ItemTypes.ToDoBox,
        hover: ({ id: draggedId, index: orgIndex }) => {
            throttleHoverItem(draggedId, index, true); 
        }
    })

    function changeTitleTxt(e) {
        e.preventDefault();
        setTitleTxt(e.target.value);
    }

    function changeElmTxt(e, id) {
        e.preventDefault();
        setToDoElms(toDoElms.map(elm=>
            elm.id === id ? { ...elm, content: e.target.value } : elm));
    }

    const onUpdateFixedYn = async () => {
        await axios
        .patch("/user/toDoBox/" + id, {}, config)
        .then((response) => {
            console.log(response.data['data']);
            setFixedColor(fixedColor === '#f5bc0f' ? '#4b4b4b' : '#f5bc0f');
        })
        .catch((error) => {console.error(error);});
        console.log("고정 상태가 변경되었습니다.");
    }

    const onUpdateToDoBoxTitle = async (e) => {
        await axios
            .put("/user/toDoBox/" + id, {title: titleTxt}, config)
            .then((response) => {
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
        console.log("타이틀이 수정되었습니다.");
    }

    const onDeleteToDoBox = async (e) => {
        await axios
            .delete("/user/" + userId + "/toDoBox/" + id, config)
            .then((response) => {
                console.log(response.data);
                deleteToDoBoxOnScreen(id);
            })
            .catch((error) => {console.error(error);});

        console.log("ToDoBox: " + id + " deleted.");
    }

    const onCreateToDoElmObj = async () => {
        await axios
            .post("/user/toDoBox/" + id, {}, config)
            .then((response) => {
                // response.data로 새로 생성된 todo element의 id가 옴
                console.log("todo elm " + response.data['data'] + "가 생성되었습니다.");
                const elm = {
                    id: response.data['data'],
                    content: "",
                    completed: false
                };
                setToDoElms([...toDoElms, elm]);
            })
            .catch((error) => {console.error(error);});
    }

    const onUpdateToDoElm = async (e, toDoElmId) => {
        await axios
            .put("/user/toDoElm/" + toDoElmId,
            {
                content: e.target.value
            }, config)
            .then((response) => {
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
        // e.target.blur();
        console.log("투두가 수정되었습니다.");
    }

    const onDeleteToDoElm = async (toDoElmId) => {
        if(editingYn){
            await axios
            .delete("/user/toDoElm/" + toDoElmId, config)
            .then((response) => {
                console.log(response.data['data']);
                setToDoElms(toDoElms.filter((elm) => elm.id !== toDoElmId));
            })
            .catch((error) => {console.error(error);});

        console.log("ToDo Element: " + toDoElmId + " deleted.");
        }
    }
    
    const onClickCompleteBtn = async (toDoElmId) => {
        await axios
            .patch("/user/toDoElm/" + toDoElmId, {}, config)
            .then((response) => {
                console.log(response.data['data']);
                
                setToDoElms(toDoElms.map(elm=> elm.id === toDoElmId ? { ...elm, completed: !elm.completed } : elm));
            })
            .catch((error) => {console.error(error);});
    }

    return <div className="toDoBox" ref={drop} style={{opacity: isDragging ? '0.5' : '1',}}>
        <div ref={previewRef}>
            <div className="toDoBox__dragRef" ref={dragRef}>
            <FontAwesomeIcon className={editingYn ? "fa faTrash visible" : "fa faTrash invisible"} icon={faTrash}
                onClick={()=> {onDeleteToDoBox();}}  />
            {/* <div >
                <FontAwesomeIcon className={editingYn ? "fa faGripHorizontal invisible" : "fa faGripHorizontal visible"} icon={faGripHorizontal} />
            </div> */}
            <form>
                <div className="toDoBox_menu" >
                    <FontAwesomeIcon className="fa faList" icon={faList} 
                        onClick={() => setEditingYn(!editingYn)}/>
                    <FontAwesomeIcon className="fa faPlus" icon={faPlus} 
                        onClick={()=>{onCreateToDoElmObj();}}/>
                </div>
                
                <div className="toDoBox__title">
                    <FontAwesomeIcon className={fixed ? "fa faThumbtack fixed" : "fa faThumbtack unfixed"} icon={faThumbtack} 
                        onClick={()=> {onUpdateFixedYn();}} style={{color: `${fixedColor}`}}/>
                    <input type="text" value={ titleTxt } 
                        onChange={changeTitleTxt} 
                        onKeyPress={onEnterKeyPressBlur}
                        onBlur={(e)=>onUpdateToDoBoxTitle(e)}
                        placeholder = "제목을 입력해주세요."
                        />         
                </div>
                <ul className="toDoBox__elm-list">
                    {toDoElms.map(elm => {
                        if(elm.content == null) elm.content = "";
                    
                        return <li key={elm.id}>
                            <FontAwesomeIcon className={
                                    editingYn
                                    ? "faCheck invisible"
                                    : elm.completed ? "faCheck completed" : "faCheck"
                                } icon={faCheck} onClick={()=>onClickCompleteBtn(elm.id)}/>
                            <FontAwesomeIcon className={editingYn ? "faMinus visible shaking" : "faMinus invisible"} icon={faMinus} 
                                onClick={()=>onDeleteToDoElm(elm.id)}/>

                            <input type="text" className={ elm.completed ? "elmInputCompleted" : null } value = {elm.content} 
                                onChange={(e) => changeElmTxt(e, elm.id)} 
                                onKeyPress={onEnterKeyPressBlur}
                                onBlur={(e) => onUpdateToDoElm(e, elm.id)}
                                placeholder = "할일을 입력해주세요."/>
                        </li>;
                    })}
                </ul>
            </form>
            </div>
        </div>
    </div>;
};

ToDoBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    fixed: PropTypes.bool.isRequired
};

export default ToDoBox;

