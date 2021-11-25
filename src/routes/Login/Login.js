import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import customAxios from "../../customAxios";

    const baseUrl = "http://localhost:8080"

        function Login() {
/*
              // IP주소 변수 선언
            const [ip, setIp] = useState('');

            // IP주소 값을 설정합니다.
            function callback(data) {
                setIp(data);
            }

            // 첫번째 렌더링을 다 마친 후 실행합니다.
            useEffect(
                () => {
                // 클라이언트의 IP주소를 알아내는 백엔드의 함수를 호출합니다.
                customAxios('/ip', callback);
                }, []
            );
            
            //const navigate = useNavigate();
            const history = useHistory();
            */
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
        
            const handleID = (e) => {
                e.preventDefault();
                setEmail(e.target.value)
            }
        
            const handlePW = (e) =>{
                e.preventDefault();
                setPassword(e.target.value)
            }
            
            const onsubmit = async() => {
                await axios
                .post(baseUrl+"/login",{
                    email,
                    password
                })
                .then((response) => {
                    const token = response.headers['ACCESS_TOKEN'];
                    localStorage.setItem('token',token);
                    localStorage.setItem('authenticatedUser', response.data);
                    
                    axios.interceptors.request.use(
                        config => {
                            const token = localStorage.getItem('token');
                            if(token){
                                config.headers['Authorization'] = 'ACCESS_TOKEN' + token;
                            }
            
                            return config;
                        },
                        error => {
                            Promise.reject(error)
                        });

                    window.location.href = "/home";
                })
                .catch(() => {

                })
            }
                const KeyPress = (e) => { 
                    if(e.key === 'Enter') {
                       onsubmit();
                    }
                }


    return(
        <div className = "InputBox">
    
            <h1>HANDEY</h1>
           
            <div className = "caption">
            <a href = "/join">회원가입</a>
            <a>/</a>
            <a href = "/findPw">비밀번호찾기</a>
            </div>
            
            <div className = "login-form">
            
            <div className = "ID">
            <label htmlFor="input_id">ID</label>
            <input className = "email"
            value={email}
            onChange={handleID}
            required={true}
            />
            </div>

            <div className = "PASSWORD">
             <label htmlFor="input_pw">PASSWORD</label>
            <input className = "password"
            value={password}
            onChange={handlePW}
            required={true}
            onKeyPress={KeyPress}
            />
            </div>

        </div>

            <button type = "button" onClick={onsubmit}>Log in</button>
        
        </div>
    )
}
export default Login;
