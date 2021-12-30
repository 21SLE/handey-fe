import React, { forwardRef, useState, useCallback } from "react";
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

    const [{ isDragging }, dragRef, previewRef] = useDrag(
        //isDragging은 아이템이 드래깅 중일때 true, 아닐때 false를 리턴 받는다. 드래깅 중인 아이템을 스타일링 할때 사용했다.
        //dragRef는 리액트의 useRef처럼 작동한다. 드래그될 부분에 선언해주면된다. 네모의 타이틀이 있는 부분에 선언했다. 
        //previewRef는 드래깅될때 보여질 프리뷰 이미지를 뜻한다. 네모전체를 감싸는 div에 선언해주었다.
        //세가지 변수는 순서만 지켜서 이름은 아무렇게나 선언해주면된다. 나는 공식홈페이지의 변수명을 사용했다.
    () => ({
      type: ItemTypes.ToDoBox,
      item: { id, index },
      //item:에 드래깅 물체안에 넣어줄 정보
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),//isDragging 변수가 현재 드래깅중인지 아닌지를 리턴해주는 부분.
      }),
      end: (item, monitor) => { //드래그가 끝났을때 작동하는 부분.
        const { id: originId, index: originIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {//didDrop이 !(아니다)라는 것은 dropRef로 선언한 태그위에 드랍되지 않음 을 의미한다.
          //그때는 원래의 위치대로 이동.
          moveToDoBox(originId, originIndex); 
        }
      },
    }), [id, index, moveToDoBox]);

    const throttleHoverItem = _.debounce((draggedId, index)=> {
        console.log('Id: '+id)
            console.log('draggedId: '+draggedId)
            console.log('index: '+index)
        if(draggedId === id) {
            return null;
        }
        moveToDoBox(draggedId, index)
    }, 1000);

    const [, drop] = useDrop({
        accept: ItemTypes.ToDoBox,
        hover: ({ id: draggedId, index: orgIndex }) => {
            throttleHoverItem(draggedId, index); 
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

    return <div className="toDoBox" ref={previewRef, drop}style={{opacity: isDragging ? '0.3' : '1',}}>
        <FontAwesomeIcon className={editingYn ? "fa faTrash visible" : "fa faTrash invisible"} icon={faTrash}
            onClick={()=> {onDeleteToDoBox();}}  />
        <div ref={dragRef}>
            <FontAwesomeIcon className={editingYn ? "fa faGripHorizontal invisible" : "fa faGripHorizontal visible"} 
            icon={faGripHorizontal}  />
        </div>
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
                        {/* <button className={editingYn ? "circleBorderBtn editingCircleBorderBtn" : "circleBorderBtn"} type="button"></button> */}
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
    </div>;
};

ToDoBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    fixed: PropTypes.bool.isRequired
};

export default ToDoBox;

