import React, {useState, useEffect} from "react"
import axios from "axios"
import { Route, useHistory } from "react-router-dom"

import { List, AddListButton, Tasks} from "./components"

import listSvg from "./assets/img/list.svg"

function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)

    const history = useHistory()

    const allTasks = [
        {
            active: history.location.pathname === '/',
            name: "Все задачи",
            icon: listSvg
        }
    ]

    const onAddList = (obj) => {
        const newList = [
            ...lists,
            obj
        ]
        setLists(newList)
    }

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map((item) => {
            if(item.id === listId){
                item.tasks = [...item.tasks, taskObj]
            }
            return item
        })
        setLists(newList)
    }

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(item => {
            if(item.id === listId){
                item.tasks =item.tasks.map(task => {
                    if(task.id === taskId)
                        task.completed = completed
                    return task
                })
            }
            return item
        })
        setLists(newList)

        axios.patch('http://localhost:3001/tasks/' + taskId, { completed })
            .catch(() => {
                alert("Не удалось обновить текст задачи")
            })
    }

    const onRemoveTask = ( listId, taskId ) => {
        if(window.confirm("Вы действительно хотите кдалить эту задачу?")){
            const newList = lists.map(item => {
                if(item.id === listId){
                    item.tasks =item.tasks.filter(task => task.id !== taskId)
                }
                return item
            })
            setLists(newList)

            axios.delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => {
                    alert("Не удалось удалить задачу")
                })
        }
    }

    const onEditTask = ( listId, taskObj ) => {
        const newTaskText = window.prompt("Текст задачи", taskObj.text)

        if(!newTaskText){
            return
        }

        const newList = lists.map(item => {
            if(item.id === listId){
                item.tasks =item.tasks.map(task => {
                    if(task.id === taskObj.id)
                        task.text = newTaskText
                    return task
                })
            }
            return item
        })
        setLists(newList)

        axios.patch('http://localhost:3001/tasks/' + taskObj.id, {text: newTaskText})
            .catch(() => {
                alert("Не удалось обновить текст задачи")
            })
    }


    const onRemoveList = (deleteItem) => {
        const newList = lists.filter(item => item.id !== deleteItem.id)
        setLists(newList)
    }

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if(item.id === id){
                item.name = title
            }
            return item
        })
        setLists(newList)
    }

    const changeView = () => {
        const listId = history.location.pathname.split('/lists/')[1]
        if(lists) {
            const list = lists.find(list => list.id === Number(listId))
            setActiveItem(list)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data)
        })

        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data)
        })

    }, [])

    useEffect(() => {
        console.log(history.location.pathname)
        changeView()
    })

  return (
    <div className="todo">
        <div className="todo__sidebar">
            <div className="todo__wrapper">
                <List
                    items={allTasks}
                    onClickItem={list => {
                        history.push(`/`)
                        changeView()
                    }}/>
                { lists ?
                    <List
                        items={lists}
                        onClickItem={list => {
                            history.push(`/lists/${list.id}`)
                            changeView()
                        }}
                        activeItem={activeItem}
                        onRemove={onRemoveList}
                        isRemovable />
                    : "Загрузка..."}
                <AddListButton onAdd={onAddList} colors={colors}/>
            </div>
        </div>
        <div className="todo__tasks">
            <Route exact path="/">
                {lists && lists.map(list => (
                    <Tasks
                        key={list.id}
                        list={list}
                        onEditTitle={onEditListTitle}
                        onAddTask={onAddTask}
                        onRemoveTask={onRemoveTask}
                        onEditTask={onEditTask}
                        onCompleteTask={onCompleteTask}
                        withoutEmpty
                    />
                ))}
            </Route>
            <Route path="/lists/:id">
                {lists && activeItem &&
                <Tasks
                    list={activeItem}
                    onEditTitle={onEditListTitle}
                    onAddTask={onAddTask}
                    onRemoveTask={onRemoveTask}
                    onEditTask={onEditTask}
                    onCompleteTask={onCompleteTask}
                />}
            </Route>
        </div>
    </div>
  )
}

export default App
