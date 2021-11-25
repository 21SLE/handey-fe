import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./HstBoxList"
import "./Search.css";
import HstBoxList from "./HstBoxList";
import HstBox from "./HstBox";


// const Input = forwardRef((props, ref) => {
//     return <input type="text" ref={ref} {...props}/>;
// });

const baseUrl = "http://localhost:8080";
    // const [hstElms, setHstElms] = useState(hstBoxList);

//class Search extends React.Component {
    
    // constructor() {
    //     super();

    //     this.state={
    //     search:null
    //     };
    // }




    //render() {        
        // const items = HstBoxList.map(data=>{
        //   return(
        //   <div>
        //     <ul>
        //       <li>
        //         <span>{data}</span>
        //       </li>
        //     </ul>
        //   </div>
        //   )
        // })
        //onChange={(e)=>this.setSearchTerm(e)} 

//         return <div className = "Search"> 
//             <div className="Search-layout">
//                     <input type="text" className = "Search_input"  />
//             </div>
//         </div> 
//     }
// }


class Search extends React.Component {

    // function search_term(params) {
    //     const [searchTerm, setSearchTerm] = useState('');

    //     searchSpace=(e)=>{
    //         let keyword = e.target.value;
    //         this.setState({search:keyword})
    //     }  
    // }onChange={(e)=>this.setSearchTerm(e)}


    render() {
        return <div className = "Search__layout">
            <span class className = "history__title">history</span>
            <input type="text" className = "Search__input" placeholder="검색"  /> 
            <div className="search__date">
                <FontAwesomeIcon className="faCalendarAlt" icon={faCalendarAlt}/>
            </div>
        </div>
    }
}

export default Search;