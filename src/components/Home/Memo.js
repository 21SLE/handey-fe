import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Memo.css";

const baseUrl = "http://localhost:8080";

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
        // TODO 회원가입 완성시 수정
        await axios.get("/user/" + userId + "/memo", config)
            .then((response) => {
                setMemoTxt(response.data['data'].content === null ? "" : response.data['data'].content);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    }

    const onUpdateMemo = async (e) => {
        // TODO 회원가입 완성시 수정
        await axios
                .put("/user/" + userId + "/memo", config, 
                {
                    content: e.target.value
                })
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
        <textarea value = {memoTxt} 
        onChange={changeMemoTxt} 
        onKeyPress={onEnterKeyPressBlur}
        onBlur={onUpdateMemo} />
    </div>;
}

export default Memo;
 