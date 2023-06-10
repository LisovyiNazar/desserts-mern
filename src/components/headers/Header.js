import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    // const [menu, setMenu] = useState(false)

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
        left: true ? 0 : "-100%"
    }

    return (
        <header>
            {/* <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div> */}

            <div className="logo">
                <h1>
                    {isAdmin ? (
                         <Link to="/">
                            Admin
                         </Link>
                    ) : (
                        <Link to="/">
                            <img src={Cart} alt='' />
                        </Link>
                    )}
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'Продукти' : 'Магазин'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Логін</Link></li>
                }

                {/* <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li> */}
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
