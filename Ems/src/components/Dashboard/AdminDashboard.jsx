import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
export default function AdminDashboard(props) {
    return (
        <div className="h-screen w-full p-10 bg-[#111] text-white mb-40">
            <Header changeUser = {props.changeUser}/>
            <CreateTask/>
            <AllTask/>
        </div>
    );
}