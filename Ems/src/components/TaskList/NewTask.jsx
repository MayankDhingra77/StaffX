import React from 'react'

const NewTask = ({ task }) => {
    return (
        <div className="task shrink-0 rounded-2xl w-80 p-6 bg-gradient-to-br from-orange-500 to-red-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-orange-300 text-orange-900 text-xs font-bold px-3 py-1 rounded-full">New Task</span>
                <span className="text-white text-xs font-medium opacity-80">{task?.taskDate || '20 March 2026'}</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">{task?.taskTitle || 'Complete DP'}</h2>
            
            <p className="text-white text-sm leading-relaxed mb-5 opacity-90">
                {task?.taskDescription || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
            </p>
            
            <button className='w-full bg-white text-red-600 font-semibold py-2 px-3 rounded-lg hover:bg-yellow-300 hover:text-orange-900 transition-colors duration-200 shadow-md'>
                → Accept Task
            </button>
        </div>
    )
}

export default NewTask
