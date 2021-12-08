import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Memo.css";

function Memo({accessToken, userId}) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [memoTxt, setMemoTxt] = useState("");

    useEffect(() => {
        getMemo();
    }, []);

    function changeMemoTxt(e) {
        e.preventDefault();
        setMemoTxt(e.target.value);
    }

    function onEnterKeyPressBlur(e) {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        }
    }

    const getMemo = async () => {
        await axios.get("/user/" + userId + "/memo", config)
            .then((response) => {
                setMemoTxt(response.data['data'].content === null ? "" : response.data['data'].content);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    }

    const onUpdateMemo = async (e) => {
        await axios
                .put("/user/" + userId + "/memo", 
                {
                    content: e.target.value
                }, config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {console.error(error);});
        // e.target.blur();
        console.log("메모가 수정되었습니다.");
    }

    useEffect(() => {
        getMemo();
    }, []);

    return <div className="memo">
        <h1 className="memo_title">Memo</h1>
        <hr />
        <textarea value = {memoTxt} 
            onChange={changeMemoTxt} 
            onKeyPress={onEnterKeyPressBlur}
            onBlur={onUpdateMemo} />
    </div>;
}

export default Memo;
 