'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(savedTasks)
  }, [])

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
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">To-Do List</h1>
          <Link href="/tutorial">
            <button className="bg-blue-500 text-white px-4 py-1.5 text-sm rounded-lg hover:bg-blue-600 transition">
              Tutorial
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-3 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <li key={i} className="flex text-black justify-between items-center bg-blue-100 p-3 rounded-xl">
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
