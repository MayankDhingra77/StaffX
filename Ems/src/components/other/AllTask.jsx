import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
export default function AllTask() {
    const { userData } = useContext(AuthContext) || {};
    return (
        <>
            <div className="bg-[#1c1c1c] p-5 rounded mt-5 h-68 ">

                <h1 className="text-3xl mb-2 font-bold"> Tasks </h1>

                <div className="bg-emerald-400 mb-2 py-2 px-4 flex justify-between rounded">
                    <h2 className="w-1/5 bg-emerald-600  pl-1">Employee Name</h2>
                    <h2 className="w-1/5 bg-emerald-600  ">New Task</h2>
                    <h2 className="w-1/5 bg-emerald-600  ">Active Task</h2>
                    <h2 className="w-1/5 bg-emerald-600  ">Completed</h2>
                    <h2 className="w-1/5 bg-emerald-600  ">Failed task </h2>
                </div>

                <div className="overflow-auto h-[80%] ">
                    {userData?.employees?.map(function (elem, idx) {
                        return <div key={idx} className={`${idx % 2 === 0 ? "bg-emerald-800" : "bg-emerald-600"} mb-2 py-2 px-4 flex justify-between rounded`}>
                                <h2 className={`w-1/5 ${idx % 2 == 0 ? "bg-emerald-600" : "bg-emerald-800"} pl-1`}>{elem.firstName}</h2>
                                <h3 className={`w-1/5 ${idx % 2 == 0 ? "bg-emerald-600" : "bg-emerald-800"}`}>{elem.taskCount.active}</h3>
                                <h4 className={`w-1/5 ${idx % 2 == 0 ? "bg-emerald-600" : "bg-emerald-800"}`}>{elem.taskCount.newTask}</h4>
                                <h4 className={`w-1/5 ${idx % 2 == 0 ? "bg-emerald-600" : "bg-emerald-800"}`}>{elem.taskCount.completed}</h4>
                                <h4 className={`w-1/5 ${idx % 2 == 0 ? "bg-emerald-600" : "bg-emerald-800"} `}>{elem.taskCount.failed}</h4>
                            </div>
                    })}
                </div>
            </div>

        </>
    )
}