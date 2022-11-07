import React from 'react'
import LoginForm from '../../components/loginForm'
import LoginImage from '../../assets/images/login_pic.svg';
import "./index.scss";

const LoginPage = () => {
    return (
        <div className='loginPage__container'>
            <img className="loginPage__image" src={LoginImage} alt="login-hero" />
            <LoginForm />
        </div>

    )
}

export default LoginPage