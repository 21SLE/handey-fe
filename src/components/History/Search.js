import React, { forwardRef, useState } from "react";
import "./HstBoxList"
import "./Search.css";
import HstBoxList from "./HstBoxList";
import HstBox from "./HstBox";


// const Input = forwardRef((props, ref) => {
//     return <input type="text" ref={ref} {...props}/>;
// });

const baseUrl = "http://localhost:8080";
    // const [hstElms, setHstElms] = useState(hstBoxList);
    // const [searchTerm, setSearchTerm] = useState('')

//class Search extends React.Component {
    
    // constructor() {
    //     super();

    //     this.state={
    //     search:null
    //     };
    // }

    // searchSpace=(e)=>{
    //     let keyword = e.target.value;
    //     this.setState({search:keyword})
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
//                     <input type="text" className = "Search_input" placeholder="검색" />
//             </div>
//         </div> 
//     }
// }

class Search extends React.Component {
    render() {
        return <div className = "Search-layout">
            < input type="text" className = "Search_input"/> 
        </div>;
    }
}

export default Search;