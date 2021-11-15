import React, { forwardRef, useState } from "react";
import "./Search.css";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>;
});

class Search extends React.Component {
    render() {
        return <div className = "Search-layout">
            <span>Search</span>
        </div>;
    }
}
export default Search;