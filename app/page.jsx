'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(savedTasks)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) {
      setError('Task cannot be empty')
      return
    }
    setTasks([...tasks, task.trim()])
    setTask('')
    setError('')
  }

  const handleDelete = (index) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">To-Do List</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a task"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>

        <ul className="mt-6 space-y-2">
          {tasks.length === 0 && <p className="text-gray-500 text-center">No tasks yet.</p>}
          {tasks.map((t, i) => (
            <li key={i} className="flex justify-between items-center bg-blue-100 p-3 rounded-xl">
              <span>{t}</span>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
