import React from "react"
import classNames from "classnames"
import axios from "axios"

import './List.scss'
import Badge from "../Badge";

import removeSvg from "../../assets/img/remove.svg"

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
    const removeList = (item) => {
        if(window.confirm("Вы действительно хотите удалить список?")){
            axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
                onRemove(item)
            })
        }
    }

    return (
        <ul className="list" onClick={onClick}>
            { items && items.map((item, index) => (
                <li
                    onClick={onClickItem ? () => onClickItem(item) : null}
                    key={index}
                    className={classNames(item.className, { "item_active": item.active ? item.active : activeItem && activeItem.id === item.id })}>
                    <i>
                        {item.icon ? <img src={item.icon} alt="list icon"/> : <Badge color={item.color.name} />}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    { isRemovable && (
                        <img
                            className="list__remove-icon"
                            src={removeSvg}
                            alt="remove"
                            onClick={() => removeList(item)}
                        />
                    )}
                </li>
            ))}
        </ul>
    )
}

export default List