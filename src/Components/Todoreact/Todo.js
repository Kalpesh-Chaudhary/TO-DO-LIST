import React, { useEffect, useState } from "react";
import "./Todo.css";

const getlocalData = ()=>{
  const lists = localStorage.getItem("Mytodolist")

 if (lists) {
   return JSON.parse(lists)
 }else{
  return[];
 }
}


const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getlocalData());
  const [isedititem, setIsedititem] = useState("")
  const [ togglebtn,setTogglebtn] = useState(false)

  const additems = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && togglebtn){
      setItems(
          items.map((curElem)=>{
            if(curElem.id === isedititem){  
              return { ...curElem, name: inputdata};
            }
            return curElem
          })
      )
    }
    
    else {
      const MynewInputdata = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, MynewInputdata]);
      setInputdata("");
    }
  };

  const removeAll =()=>{
    setItems([]);
  }


  useEffect(() => {
  localStorage.setItem('Mytodolist', JSON.stringify(items))
  }, [items])
  

  const editItem =(index)=>{
     const tudo =items.find((curElem)=>{
      return curElem.id === index
     })
     setInputdata(tudo.name);
     setIsedititem(index);
     setTogglebtn(true)
  }

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./Image/tudo.webp" alt="" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="additems">
            <input
              type="text"
              placeholder=" ✍ Add Item"
              className="form-cantrol"
              value={inputdata}
              onChange={(e) => setInputdata(e.target.value)}
            />
            {togglebtn ? (  <i className=" far fa-edit add-btn" onClick={additems}></i>  ):( <i className=" fa fa-plus add-btn" onClick={additems}></i>)}
            </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItems" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn"
                    onClick={()=> editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn" onClick={removeAll}>CHECK LIST</div>
        </div>
      </div>
    </>
  );
};

export default Todo;
