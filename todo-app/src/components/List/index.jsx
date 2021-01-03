import React from 'react'

import './List.scss'

const List = ({items}) => {
    return (
        <ul className="list">
            { items.map(item => (
                <li className={item.active ? "item_active" : ""}>
                    <i>
                        {item.icon ? <img src={item.icon} alt="list icon"/> : <i className={`badge badge--${item.color}`}> </i>}
                    </i>
                    <span>{item.name}</span>
                </li>
            ))}
        </ul>
    )
}

export default List