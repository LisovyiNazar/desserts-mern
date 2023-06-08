import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Фільтри: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>Всі продукти</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Пошук"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Сортувати за: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Дата: спочатку нові</option>
                    <option value='sort=oldest'>Дата: спочатку старі</option>
                    <option value='sort=-sold'>найкращі продажі</option>
                    <option value='sort=price'>Ціна: за зростанням</option>
                    <option value='sort=-price'>Ціна: за спаданням</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
