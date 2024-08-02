import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function ToDoList() {
    let [todolist,setToDoList] = useState([]);
    let [empty,setEmpty] = useState('');


    let saveToDoList = (event)=>{
      event.preventDefault();
      let inpToDoValue = event.target.inpToDoValue.value;
      if(!todolist.includes(inpToDoValue)){
        let finaltoDoList = [...todolist,inpToDoValue];
        setToDoList(finaltoDoList);
        setEmpty('');
      }else{
        toast.success("ToDo is Already Exist....");
      }
    }

    let list = todolist.map((value,index)=>{
        return(
            <ToDoListComp value={value} key={index} indexNum = {index}
             todolist = {todolist}
             setToDoList = {setToDoList}
             />
        )
    })

  return (
    <div>
        <h1 className='text-center bg-[#377ee7] p-3 text-white font-bold'>ToDo List</h1>
            <form onSubmit={saveToDoList} className='px-5'>
                <div className='flex flex-row mt-5 items-center'>
                    <input type='text' name='inpToDoValue' value={empty} onChange={(e) => setEmpty(e.target.value)} className='w-full p-2 border border-gray-700 rounded-full' placeholder='Your input here'/>
                    <button className='p-2 px-3 ml-5 bg-blue-500 text-white rounded hover:bg-blue-800'>Submit</button>
                </div>
            </form>
            <ToastContainer/>
            <ul className=''>

               {list}

            </ul>
        
    </div>
  )
}

function ToDoListComp({value,indexNum,todolist,setToDoList}){
  let [status,setStatus] = useState(false);

    let deleteRow =(event)=>{
        event.stopPropagation();
        let finalData = todolist.filter((data,index)=> index !== indexNum)
        setToDoList(finalData);
    }

    let checkStatus=()=>{
      setStatus(!status);
    }

    return(
        <li onClick={checkStatus} className= {(status) ? 'line-through flex mb-3 p-2 mt-4  bg-red-500 rounded-full mx-4 pl-5  text-white' : 'flex mb-3 p-2 mt-4  bg-blue-500 rounded-full mx-4 pl-5  text-white'}>{indexNum + 1}. {value}
                    <span onClick={deleteRow} className='ml-auto cursor-pointer mr-3' >&times;</span></li>
    )
}
