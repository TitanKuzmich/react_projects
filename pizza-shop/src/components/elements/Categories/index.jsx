import React, {memo} from 'react'
import classNames from 'classnames'

const Categories = memo(function Categories({ activeCategory, items, onClickCategory }) {

    return (
        <div className="categories">
            <ul>
                <li
                    className={classNames({'active': activeCategory === null})}
                    onClick={() => onClickCategory(null)}
                >
                    Все
                </li>
                {items && items.map((name, index) => (
                    <li
                        className={classNames({'active': index === activeCategory})}
                        key={`${name}_${index}`}
                        onClick={() => onClickCategory(index)}
                    >{name}</li>
                ))}
            </ul>
        </div>
    )
})

export default Categories