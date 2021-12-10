import React, { useState } from "react"
import { faPlus, faTrash, faList, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DropDownMenu.css"

function DropDownMenu() {
    const [state, setState] = useState(false);
    const showDropDownMenu = () => {
        setState(true);
    }
    const hideDropDownMenu = () => {
        setState(false);
    }
    
    return <div className="dropDownMenu"  onMouseEnter={showDropDownMenu} onMouseLeave={hideDropDownMenu}>
        <div className="dropDownMenuIcon">
            <FontAwesomeIcon className="fa faEllipsisV" icon={faEllipsisV}/>
            {
                state
                    ? <ul className="dropDownMenu-items" onMouseEnter={showDropDownMenu}>
                        {/* 위클리 요소들 삭제, 위클리 박스 삭제, 추가*/}
                        <li><FontAwesomeIcon className="fa faPlus" icon={faPlus}/></li>
                        <li><FontAwesomeIcon className="fa faList" icon={faList}/></li>
                        <li><FontAwesomeIcon className="fa faTrash" icon={faTrash}/></li>  
                    </ul>
                    : null
            }
            
        </div>
    </div>
}

export default DropDownMenu;