import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

export default function TaskList({data}) {
    return(
        <>
        <div id="taskList" className="overflow-x-auto h-[55%] py-5 w-full mt-10 flex items-center justify-start  gap-5 flex-nowrap">


            <AcceptTask/>
            <NewTask/>
            <CompleteTask/>
            <FailedTask/>


        </div>
        </>
    )
}