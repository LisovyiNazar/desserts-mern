import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'



function Pages() {


    return (
        <Routes>
            <Route path="/" exact element={<Products/>} />
            <Route path="/detail/:id" exact element={<DetailProduct/>} />
            <Route path="/login" element={<Login />} />

            <Route path="/register" exact element={<Register/>} />

            <Route path="/category" exact element={<Categories/>} />
            <Route path="/create_product" exact element={<CreateProduct/>} />
            <Route path="/edit_product/:id" exact element={<CreateProduct/>} />

            <Route path="/history" exact element={<OrderHistory/>} />
            <Route path="/history/:id" exact element={<OrderDetails/>} />

            <Route path="/cart" exact element={<Cart/>} />

            <Route path="*" exact element={<NotFound/>} />
        </Routes>
    )
}

export default Pages
