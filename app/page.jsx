'use client';

import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      const result = await response.json();

      if (result.success) {
        setTodos(result.data);
        setError(null);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (error) {
      setError('Error fetching todos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo._id === updatedTodo._id ? updatedTodo : todo
    ));
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo._id !== todoId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchTodos}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 size={40} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Todo App</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Stay organized and get things done!
          </p>
        </header>

        {/* Todo Form */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}