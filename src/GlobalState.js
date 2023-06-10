import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'
import Cookies from 'js-cookie'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            const refreshToken = async () => {
                const refreshtoken = Cookies.get('refreshtoken')
                
                await axios.post('http://localhost:4000/user/refresh_token', {
                    refreshtoken: refreshtoken
                })
                    .then((res) => {
                        if (res.data.accesstoken) {
                            setToken(res.data.accesstoken)
                            
                            setTimeout(() => {
                                refreshToken()
                            }, 10 * 60 * 1000)
                        }
                    })
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}