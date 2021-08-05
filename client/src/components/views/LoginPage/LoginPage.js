import React, {useState} from 'react';
import Axios from 'axios';
import {useDispacth} from 'react-redux';

function LoginPage(){

    //state 추가 
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    //state 변경 
    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();//page refresh 방지 
     
        //state에 뭐가 있는지 확인
        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email : Email, 
            password : Password
        };

        Axios.post('/api/users/login', body)
        .then(response => {

        });
    }

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}
            >
                <label>E-mail</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <br/>
                <button>
                    Login
                </button>

            </form>
        </div>
    );
};

export default LoginPage;