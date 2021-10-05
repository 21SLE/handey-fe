import React from "react";
import { withRouter,Redirect} from "react-router-dom";
import "./Login.css";

class Login extends React.Component{

    state = {
        userEmail : "",
        userPw : "",
        idCheck : false,
        pwCheck : false,
        btnColor :"#ffffff"
    };

    //이동 위치
    move = () => {
        this.props.history.push("/home");
    };

    //아이디 체크
    idChecked = (event) => {
        this.setState({userEmail : event.target.value});
        if(event.target.value.includes("@")){
            this.setState({idCheck : true}, () => this.btnChangeColor());
        } else{
            this.setState({idCheck : false}, () => this.btnChangeColor());
        }
    };

    //비밀번호 체크
    passwordChecked = (event) => {
        this.setState({userPw : event.target.value});
        if(event.target.value.length >= 8){
            this.setState({userEmail : event.target.value , pwCheck : true}, () => this.btnChangeColor());
        } else{
            this.setState({pwCheck : false}, () => this.btnChangeColor());
        }
    };

    //버튼 색 변화
    btnChangeColor = () => {
        if(this.state.idCheck && this.state.pwCheck){
            this.setState({btnColor: "#F9A825"});
        }
        else{
            this.setState({btnColor: "#ffffff"})
        }
    };

    //버튼 클릭
    btnClick = () => {
        this.move();
    }

    render() {
        return(
            <div className = "Login">
                <div className = "LoginForm">
                    <p className = "Logo">Sign in</p>
                    <input
                    className = "userId"
                    type = "text"
                    placeholder = "Email"
                    onChange = {this.idChecked}
                    />
                     <input
                    className = "userPw"
                    type = "text"
                    placeholder = "PW"
                    onChange = {this.passwordChecked}
                    />
                    <button
                    className = "loginBTN"
                    type = "button"
                    style = {{backgroundColor : this.state.btnColor}}
                    onClick = {this.btnClick}
                    >Login</button>

                </div>
            </div>

        )
    }

}

export default withRouter(Login);