import React from 'react'
import List from "./components/List"

import listSvg from "./assets/img/list.svg"

const allTasks = [
    {
        name: "Все задачи",
        icon: listSvg
    }
]

const tasksList = [
    {
        name: "Покупки",
        color: "green",
        active: true
    },
    {
        name: "Фронтенд",
        color: "blue"
    },
    {
        name: "Фильмы и сериалы",
        color: "pink",
    },
]

function App() {
  return (
    <div className="todo">
        <div className="todo__sidebar">
            <div className="todo__wrapper">
                <List items={allTasks}/>
                <List items={tasksList}/>
            </div>
        </div>
        <div className="todo__tasks">

        </div>
    </div>
  )
}

export default App
