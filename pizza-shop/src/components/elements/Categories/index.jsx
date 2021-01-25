import React, {memo, useState} from 'react';
import classNames from 'classnames'

const Categories = memo(function Categories({ items, onClickItem }) {

    const [activeItem, setActiveItem] = useState(null)

    const onSelectItem = (index) => {
        setActiveItem(index)
        onClickItem(index)
    }

    return (
        <div className="categories">
            <ul>
                <li
                    className={classNames({'active': activeItem === null})}
                    onClick={() => setActiveItem(null)}
                >
                    Все
                </li>
                {items && items.map((name, index) => (
                    <li
                        className={classNames({'active': index === activeItem})}
                        key={`${name}_${index}`}
                        onClick={ () => onSelectItem(index) }
                    >{name}</li>
                ))}
            </ul>
        </div>
    );
})

export default Categories;