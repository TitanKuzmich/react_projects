import React, {useState, useEffect} from "react"
import axios from 'axios'

import List from "../List";
import Badge from "../Badge";

import "./AddList.scss"

import addSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

const addListBtn = [
    {
        name: "Добавить список",
        icon: addSvg,
        className: "list__add-button"
    }
]

const AddListButton = ({ colors, onAdd }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [selectedColor, selectColor] = useState(1)

    const addList = () => {
        if(!inputValue){
            alert("Введите название списка")
            return
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0];
                const listObj = { ...data, color, tasks: [] };
                onAdd(listObj);
                onClose();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };


    useEffect(() => {
        if(Array.isArray(colors)){
            selectColor(colors[0].id)
        }
    }, [colors])

    return (
        <div className="add-list">
            <List items={addListBtn} onClick={() => {setVisiblePopup(!visiblePopup)}}/>
            {visiblePopup &&
                <div className="popup__wrapper">
                    <div className="add-list__popup">
                        <img
                            onClick={() => setVisiblePopup(false)}
                            src={closeSvg}
                            alt="close"
                            className="add-list__popup-close-btn"
                        />
                        <input
                            onChange={e => setInputValue(e.target.value)}
                            value={inputValue}
                            className="field"
                            type="text"
                            placeholder="Название списка"
                        />
                        <div className="add-list__popup-colors">
                            {colors.map(color => (
                                <Badge
                                    key={color.id}
                                    color={color.name}
                                    onClick={() => selectColor(color.id)}
                                    className={selectedColor === color.id && 'active'}
                                />
                            ))}
                        </div>
                        <button onClick={addList} className="button">{isLoading ? 'Добавление...' : 'Добавить'}</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddListButton