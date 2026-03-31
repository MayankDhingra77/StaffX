export default function TaskListNumbers({data}){
    return(
        <>
        <div className="flex mt-10 j`ustify-between gap-5 screen ">
            <div className="px-9 py-6 w-[45%] bg-red-600 rounded-xl ">
            <h2 className="text-3xl font-semibold">{data.taskCount.newTask}</h2>
            <h3 className="text-xl font-medium">New Task </h3>
            </div>
            <div className="px-9 py-6 w-[45%] bg-blue-600 rounded-xl ">
            <h2 className="text-3xl font-semibold">{data.taskCount.completed}</h2>
            <h3 className="text-xl font-medium">Completed Task </h3>
            </div>
            <div className="px-9 py-6 w-[45%] bg-green-600 rounded-xl ">
            <h2 className="text-3xl font-semibold">{data.taskCount.active}</h2>
            <h3 className="text-xl font-medium">Accepted Task </h3>
            </div>
            <div className="px-9 py-6 w-[45%] bg-yellow-600 rounded-xl ">
            <h2 className="text-3xl font-semibold">{data.taskCount.failed}</h2>
            <h3 className="text-xl font-medium">Failed Task </h3>
            </div>
        </div>
        </>
    )
}