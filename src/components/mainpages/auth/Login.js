import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('https://desserts-mern.onrender.com/user/login', {...user}).then((response) => {
                if (response.data.accesstoken && response.data.refreshtoken) {
                    Cookies.set('refreshtoken', response.data.refreshtoken);

                    localStorage.setItem('token', response.data.accesstoken)
                    
                    window.location.href = "/";
                }
            })

        } catch (err) {
            alert(err?.response?.data?.msg);
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Логін</h2>
                <input type="email" name="email" required
                placeholder="Електронна адреса" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Пароль" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Логін</button>
                    <Link to="/register">Раєстрація</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
