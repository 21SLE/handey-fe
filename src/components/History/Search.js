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

class Search extends React.Component {
    
    constructor() {
        super();

        this.state={
        search:null
        };
    }

    searchSpace=(e)=>{
        let keyword = e.target.value;
        this.setState({search:keyword})
    }

    render() {
        const items = HstBoxList.map(data=>{
          return(
          <div>
            <ul>
              <li>
                <span>{data}</span>
              </li>
            </ul>
          </div>
          )
        })

    // const items = HstBoxList.map(data=>{
    //     return(
    //     <div>
    //       <ul>
    //         <li style={{position:'relative',left:'10vh'}}>
    //           <span>{data.name}</span>
    //           <span>{data.age}</span>
    //           <span>{data.country}</span>
    //         </li>
    //       </ul>
    //     </div>
    //     )
    //   })
                // .filter((val)=> {
                //     if (searchTerm == "") {
                //         return val
                //     } else if (val.sta_nm.toLowerCase().includes(searchTerm.toLowerCase()) || val.sido_nm.toLowerCase().includes(searchTerm.toLowerCase())) {
                //         return val}
                // })

        return (
            <div className = "Search">
                <input type="text" className = "Search_input" placeholder="검색" onChange={(e)=>this.setSearchTerm(e)}/>
                    <div className="Search-layout">
                    {/* {HstBoxList.map((val, key) => {
                        return (
                            <div className="history" key={key}>
                                <p> {val.sta_nm} </p>
                            </div>
                        );
                    })} */}
                    <span> {items} </span>
                    </div>
            </div>
        )
    }
}
export default Search;