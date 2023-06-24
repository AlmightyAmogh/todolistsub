import React, { useEffect, useState } from 'react'



const getLocalTasks = () =>{
  let task = localStorage.getItem('tasks');
  if(task){
    return JSON.parse(task);
  }else{
    return [];
  }
 
}

const TodoList = () => {
  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState(getLocalTasks())
  const [toggleEdit, setToggleEdit] = useState(false)
  const [isEditItem, setIsEditItem] = useState(null)
  const [searchShow, setSearchShow] = useState(false)
  const [searchField, setSearchField] = useState("");
  const [filteredItemList, setFilteredItemsList] = useState([])
  const addItem = () =>{
    if(!inputData){
      alert('enter some data before adding')
    }
    else if(inputData && toggleEdit){
      setItems(items.map((elem)=>{
        if(elem.id===isEditItem){
          return {...elem, name: inputData}
        } 
        return elem;
      }))
      setToggleEdit(false);
      setInputData('')
      setIsEditItem(null);
    }
    // else if(inputData && searchShow ){
      
    // }
    else{
      const allTasks = { id : new Date().getTime().toString() , name : inputData} 
      setItems([...items,allTasks])
      setInputData('')
    }
    
  }
  const deleteItem = (index) =>{
    console.log(index)
    const updatedItems = items.filter((elem)=>{
      return index!==elem.id;
    });
    setItems(updatedItems);
  }

  const removeAll = () =>{
    setItems([]);
  }

  const editItem = (index) =>{
    let newEditItems = items.find((elem)=>{
      return elem.id === index
    })
    setToggleEdit(true);
    setInputData(newEditItems.name)
    setIsEditItem(index);
  }


  const searchItem = () =>{
    setSearchShow(true);
    setSearchField(inputData);
    console.log(searchField);

    if(searchField === ''){
      setSearchShow(false);

    }else{
      setSearchShow(true);
    }

    if(searchShow){

      const filteredItems = items.filter(
        elem => {
          return (
            elem
            .name
            .toLowerCase()
            .includes(searchField.toLowerCase()) 
          );
        }
      )







      // const filteredItems = items.filter((elem)=>{
      //   if(inputData===elem.name){
      //     return elem
      //   }
      //   return [];
      // })
      console.log(filteredItems)
      
      localStorage.setItem('filteredTasks',JSON.stringify(items));
      setInputData('');
      
      setFilteredItemsList(localStorage.getItem('filteredTasks'));
    }
    
  }



  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(items))
  
    
  }, [items])
  

  return (
    <>
    <div className='main_div'>
        <div className='upper'>
            <figure>
                <img src="/62020.jpg" alt="Notes Figure" />
                <figcaption>Your Todo List</figcaption>
            </figure>
            <div className='addItems flex '>
                <input type="text" placeholder='Add Item' value={inputData} onChange={(e)=>setInputData(e.target.value)} />
                {
                  toggleEdit ?(<div className='flex input-edit'><i className='far fa-edit add-btn flex align-center' title='Update item' onClick={addItem}></i> </div>) :
                  (
                    <div className='flex '>
                    <i className='fa fa-plus add-btn' title='Add item' onClick={addItem}></i>
                    <i className='fa fa-search add-btn' title='Search item' onClick={searchItem}></i>
                    </div>
                  )
                 
                  
                }
                
            </div>

          <div className='showItems'>
            { items.filter((elem)=>{
              return elem
              .name
              .toLowerCase()
              .includes(searchField.toLowerCase()) 
            }).map((elem)=>{
                return(
                  <div className="eachItem" key={elem.id}><h3>{elem.name}</h3>
                  <div className="todo-btn">
              <i className='far fa-edit add-btn' title='edit item' onClick={()=>editItem(elem.id)}></i>
              <i className='far fa-trash-alt add-btn' title='delete item' onClick={()=>deleteItem(elem.id)}></i>
              </div>
              </div>
                )
              })
            }
          
             
            
          </div>
          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text='remove all' onClick={removeAll}><span>CheckList</span></button>
            </div>
          
        </div>
        <div className=''></div>
    </div>
    </>
  )
}

export default TodoList