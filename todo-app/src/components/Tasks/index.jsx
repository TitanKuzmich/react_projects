import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import "./Tasks.scss"

import editSvg from "../../assets/img/edit.svg"

import AddTaskList from "./AddTaskList";
import Task from "./Task";

function Tasks( { list, setActive, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty } ) {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if(newTitle){
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert("Не удалось обновить название списка.")
            })
        }
    }

    return (
        <div className="tasks">
            <h2 style={{ color: list.color.hex }} className="tasks__title">
                {list.name}
                <img
                    src={editSvg}
                    alt="edit"
                    onClick={editTitle}
                />
            </h2>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        onRemove={onRemoveTask}
                        onEdit={onEditTask}
                        onComplete={onCompleteTask}
                        list={list}
                    />
                    ))}
                <AddTaskList key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
}

export default Tasks;