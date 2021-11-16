import React, { forwardRef, useState } from "react";
import "./Search.css";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

class Search extends React.Component {
    render() {
        return <div className = "Search-layout">
            < input type="text" className = "Search_input"/> 
        </div>;
    }
}
export default Search;