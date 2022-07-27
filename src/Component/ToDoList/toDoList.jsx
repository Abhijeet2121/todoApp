import React from 'react';
import './toDoList.style.scss'

const getLocalItems = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = React.useState('');
    const [items, setItems] = React.useState(getLocalItems());
    const [toggle, setToggle] = React.useState(true);
    const [isEditItem, setIsEditItem] = React.useState(null);

    const itemEvent = (event) => {
        setInputData(event.target.value);
    }
    
    //// ADD ITEM
    const addItem = () => {
        if (!inputData) {
            alert("Please fill data");
        }
        else if (inputData && !toggle) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggle(true);
            setInputData('');
            setIsEditItem(null);
        }
        else {
            const allInputData = { id: (new Date().getSeconds()).toString(), name: inputData }
            setItems([...items, allInputData])
            setInputData('')
            console.log(allInputData);
        }
    }
    //// DELETE ITEM

    const deleteItem = (ind) => {
        // console.log(id)
        const updatedItem = items.filter((elem) => {
            return (ind !== elem.id);
        });
        setItems(updatedItem);

    }

    //// REMOVE ITEM

    const removeAll = () => {
        setItems([]);
    }

    ////EDIT ITEM

    const editItem = (id) => {
        let newEditItems = items.find((elem) => {
            return elem.id === id
        });
        setToggle(false);
        setInputData(newEditItems.name);
        setIsEditItem(id);
    }

    //// GET ITEM FROM LOCAL STORAGE

    React.useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items))
    }, [items]);

    return (
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img className="todo-logo" src="https://images.ctfassets.net/lzny33ho1g45/best-android-to-do-list-apps-p-img/501a7d8823758b5f40362191fe938dfe/file.png?w=1520&fm=jpg&q=30&fit=thumb&h=760" alt="todo-logo" />
                    <figcaption>
                        Add your list Here!
                    </figcaption>
                </figure>
            </div>

            <div className='addItems'>
                <input type="text" placeholder='Add Task'
                    value={inputData}
                    onChange={itemEvent}
                />
                {
                    toggle ?
                        <button type="submit" className='add-btn' title='Add Item'
                            onClick={addItem}>
                            <span> + </span>
                        </button>
                        :
                        <button type="submit" className='add-btn' title='Update Item'
                            onClick={addItem}>
                            <span> Edit </span>
                        </button>
                }
            </div>

            <div className='showItems'>
                {
                    items.map((elem) => {
                        return (
                            <div className='eachItem' key={elem.id}>
                                <h3>{elem.name}</h3>
                                <div className='todo-btn'>
                                    <button className='add-btn' title='DeleteItem'
                                        onClick={() => deleteItem(elem.id)}>
                                        <span>x</span>
                                    </button>
                                    <button className='add-btn' title='Edit Item'
                                        onClick={() => editItem(elem.id)}>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                <button className="btn-remove" onClick={removeAll}>
                    <span>Clear All</span></button>
            </div>

        </div>
    )
}

export default Todo;