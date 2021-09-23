import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Memo.css";

const baseUrl = "http://localhost:8080";

function Memo({id, content}) {

    const [memoTxt, setMemoTxt] = useState(content == null ? "" : content);

    function changeMemoTxt(e) {
        e.preventDefault();
        setMemoTxt(e.target.value);
    }

    const getMemo = async () => {
        // TODO 회원가입 완성시 수정
        await axios.get(baseUrl + "/memo/1")
            .then((response) => {
                setMemoTxt(response.data.content === null ? "" : response.data.content);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    }

    const onUpdateMemo = async (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // TODO 회원가입 완성시 수정
            await axios
                    .put(baseUrl + "/memo/1", 
                    {
                        content: e.target.value
                    })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {console.error(error);});
            e.target.blur();
            console.log("메모가 수정되었습니다.");
        }
    }

    useEffect(() => {
        getMemo();
    }, []);

    return <div className="memo">
        <textarea value = {memoTxt} onChange={changeMemoTxt} onKeyPress={onUpdateMemo} />
    </div>;
}

export default Memo;