import React from 'react'

const FailedTask = ({ task }) => {
    return (
        <div className="task shrink-0 rounded-2xl w-80 p-6 bg-linear-to-br from-amber-500 to-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Failed</span>
                <span className="text-white text-xs font-medium opacity-80">{task?.taskDate || '20 March 2026'}</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">{task?.taskTitle || 'Complete DP'}</h2>
            
            <p className="text-white text-sm leading-relaxed mb-5 opacity-90">
                {task?.taskDescription || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
            </p>
            
            <button className='w-full bg-red-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md' disabled>
                ✕ Task Failed
            </button>
        </div>
    )
}

export default FailedTask
