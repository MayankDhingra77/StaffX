export default function CreateTask(){
    return(
        <>
        <div className="bg-[#1c1c1c] mt-10 p-8 rounded-2xl">
                
                <form className="flex gap-10">

                    <div className="flex flex-col gap-5 w-1/2">

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Task Title</h3>
                            <input
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="text"
                                placeholder="Make a UI design"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Date</h3>
                            <input
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="date"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Assign to</h3>
                            <input
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 "
                                type="text"
                                placeholder="Employee Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm text-gray-400">Category</h3>
                            <input
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
                                className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 h-40 "
                            ></textarea>
                        </div>

                        <button className="bg-emerald-400 hover:bg-emerald-500  transition-all rounded-lg py-3 font-semibold">
                            Create Task
                        </button>

                    </div>

                </form>
            </div>
        </>
    )
}