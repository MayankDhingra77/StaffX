import { useState } from "react";

export default function CreateTask() {
    const [taskTitle , setTaskTitle] = useState('') ;
    const [taskDate , setTaskDate] = useState('') ;
    const [taskDescription , setTaskDescription] = useState('') ;
    const [assignTo , setAssignTo] = useState('') ;
    const [category , setCategory] = useState('') ;
    const [newTask , setNewTask] = useState({}) ;
    const submitHandler = (e) =>{ 
            e.preventDefault() ;
            setNewTask({taskTitle , taskDate , taskDescription , assignTo , category , Active:false , newTask:true , failed : false , completed:false})
            const data = JSON.parse(localStorage.getItem('employees'))
            data.forEach((elem) => {
                if(assignTo == elem.firstName) {
                    elem.tasks.push(newTask)
                }
            })
            localStorage.setItem('employees',JSON>stringify(data)) ;
            setTaskTitle('') ;
            setTaskDate('') ;
            setTaskDescription('') ;
            setAssignTo('') ;
            setCategory('') ;
    }
    return (
        <>
            <div className="bg-[#1c1c1c] mt-10 p-8 rounded-2xl">

                <form onSubmit={(e)=>{
                    submitHandler(e)
                }} className="flex gap-10">

                    <div className="flex flex-col gap-5 w-1/2">

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Task Title</h3>
                            <input 
                                value = {taskTitle}
                                onChange={(e) =>{
                                    setTaskTitle(e.target.value) ;
                                }}
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="text"
                                placeholder="Make a UI design"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Date</h3>
                            <input
                                value = {taskDate}
                                onChange={(e) =>{
                                    setTaskDate(e.target.value) ;
                                }}
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="date"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Assign to</h3>
                            <input
                                value = {assignTo}
                                onChange={(e) =>{
                                    setAssignTo(e.target.value) ;
                                }}
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="text"
                                placeholder="Employee Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Category</h3>
                            <input
                                value = {category}
                                onChange={(e) =>{
                                    setCategory(e.target.value) ;
                                }}
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="text"
                                placeholder="design, dev, etc"
                            />
                        </div>

                    </div>


                    <div className="flex flex-col gap-5 w-1/2">

                        <div className="flex flex-col gap-1 h-full">
                            <h3 className="text-sm text-gray-400">Description</h3>
                            <textarea
                                value = {taskDescription}
                                onChange={(e) =>{
                                    setTaskDescription(e.target.value) ;
                                }}
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 h-40 "
                            ></textarea>
                        </div>

                        <button className="bg-emerald-600 hover:bg-emerald-700  transition-all rounded-lg py-3 font-semibold">
                            Create Task
                        </button>

                    </div>

                </form>
            </div>
        </>
    )
}