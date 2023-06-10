import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() => {
                        if (window.confirm("Ви дійсно хочете видалити цей продукт?")) {
                            deleteProduct(product._id, product.images.public_id)
                        }
                    }}>
                        Видалити
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Редагувати
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        купити
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        Детальніше
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
