import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist"); //get the data from this key 

    if (lists) {
        return JSON.parse(lists);     //then save the data
    } else {
        return [];
    }
};

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());

    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // Function to Add items 
    const addItem = () => {
        if (!inputdata) {
            alert("plz fill the data");
        } else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData]);    // reflect the value with previous value
            setInputData("");    // make the add items section empty after adding the items
        }
    };

    //Function to edit items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    // Function to delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    // To Remove all the items
    const removeAll = () => {
        setItems([]);   //pass an empty array so that there will no value in items
    };

    // Adding items in LocalStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));   //adding key("mytodolist") and then items
    }, [items]);   //it should work when there is something in items

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={process.env.PUBLIC_URL + '/images/todo.svg'} alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>

                    {/* show our items  */}
                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i
                                            className="far fa-edit add-btn"
                                            onClick={() => editItem(curElem.id)}></i>
                                        <i
                                            className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* remove all items  */}
                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;