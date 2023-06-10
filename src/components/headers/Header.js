import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('https://desserts-mern.onrender.com/user/logout')
        
        localStorage.removeItem('token')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Створити продукт</Link></li>
                <li><Link to="/category">Категорії</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">Історія</Link></li>
                <li><Link to="/" onClick={logoutUser}>Вийти</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(prev => !prev)}>
                меню
            </div>

            <div className="logo">
                <h1>
                    {isAdmin ? (
                         <Link to="/">
                            Admin
                         </Link>
                    ) : (
                        <Link to="/">
                            <img src={Cart} alt='' />
                            <span className='title'>Premium Desserts</span>
                        </Link>
                    )}
                </h1>
            </div>

            <ul style={styleMenu} onClick={() => setMenu(prev => !prev)}>
                <li><Link to="/">{isAdmin ? 'Продукти' : 'Магазин'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Логін</Link></li>
                }

                <li onClick={() => setMenu(prev => !prev)}>
                    <div className="menu"> X </div>
                </li>
            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
