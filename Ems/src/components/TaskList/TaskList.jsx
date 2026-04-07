import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

export default function TaskList({data}) {
    console.log(data) ;
    return(
        <>
        <div id="taskList" className="overflow-x-auto h-[55%] py-5 w-full mt-10 flex items-center justify-start  gap-5 flex-nowrap">


            {/* <AcceptTask/>
            <NewTask/>
            <CompleteTask/>
            <FailedTask/> */}
            {data.tasks.map((elem , idx)=>{
                if(elem.active) return <AcceptTask  key = {idx}  task = {elem}/>
                if(elem.newTask) return <NewTask key = {idx} task = {elem}/>
                if(elem.completed) return <CompleteTask key = {idx} task = {elem}/>
                if(elem.failed) return <FailedTask key = {idx} task = {elem}/>
            })}


        </div>
        </>
    )
}