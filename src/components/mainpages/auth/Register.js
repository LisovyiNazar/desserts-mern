import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        console.log(user);
        try {
            await axios.post('https://desserts-mern.onrender.com/user/register', {...user})
                .then((response) => {
                    if (response.data.accesstoken) {
                        Cookies.set.save('refreshtoken', response.data.accesstoken);
                        localStorage.setItem('token', response.data.accesstoken)
            
                        window.location.href = "/";
                    }
                })

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Раєстрація</h2>
                <input type="text" name="name" required
                placeholder="Імʼя" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Електронна адреса" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Пароль" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Раєстрація</button>
                    <Link to="/login">Логін</Link>
                </div>
            </form>
        </div>
    )
}

export default Register