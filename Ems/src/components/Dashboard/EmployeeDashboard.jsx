import Header from "../other/Header"
import TaskListNumbers from "../other/TaskListNumbers"
import TaskList from "../TaskList/TaskList"
export default function EmployeeDashboard(props){
    return(
        <>
            <div className="p-10 bg-[#1c1c1c] h-screen">
                <Header changeUser = {props.changeUser} data = {props.data}/>
                <TaskListNumbers data = {props.data}/>
                <TaskList data = {props.data}/>
            </div>
        </>
    )
}