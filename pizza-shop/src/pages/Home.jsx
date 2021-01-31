import React, {useCallback, useEffect} from 'react'
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from "../components"
import {useDispatch, useSelector} from "react-redux"

import {setCategory, setSortBy} from "../redux/actions/filters"
import {fetchPizzas} from "../redux/actions/pizzas"
import {addPizzaToCart} from "../redux/actions/cart"

const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'},
]

const categoriesItems = [
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
]

function Home() {
    const dispatch = useDispatch()
    const items = useSelector(({pizzas}) => pizzas.items)
    const cartItems = useSelector(({cart}) => cart.items)
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded)
    const {category, sortBy} = useSelector(({filters}) => filters)

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index))
    }, [])

    const onSelectSortType = useCallback((type) => {
        dispatch(setSortBy(type))
    }, [])

    const onClickAddPizza = (pizza) => {
        dispatch(addPizzaToCart(pizza))
    }

    useEffect(() => {
        dispatch(fetchPizzas(category, sortBy))
    }, [category, sortBy])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    items={categoriesItems}
                    onClickCategory={onSelectCategory}
                />
                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map(obj => (<PizzaBlock addedCount={cartItems[obj.id] && cartItems[obj.id].items.length} onClickAddPizza={onClickAddPizza} key={obj.id} {...obj}/>)) : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index}/>)}
            </div>
        </div>
    )
}

export default Home