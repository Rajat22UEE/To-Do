'use client';

import { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed
        }),
      });

      const result = await response.json();
      if (result.success) {
        onUpdateTodo(result.data);
      }
    } catch (error) {
      alert('Error updating todo: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
  };

  const handleSaveEdit = async () => {
    if (!editData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editData,
          completed: todo.completed
        }),
      });

      const result = await response.json();
      if (result.success) {
        onUpdateTodo(result.data);
        setIsEditing(false);
      } else {
        alert('Error updating todo: ' + (result.error.join ? result.error.join(', ') : result.error));
      }
    } catch (error) {
      alert('Error updating todo: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        onDeleteTodo(todo._id);
      }
    } catch (error) {
      alert('Error deleting todo: ' + error.message);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
      todo.completed 
        ? 'border-green-500 opacity-75' 
        : isOverdue 
        ? 'border-red-500' 
        : 'border-blue-500'
    }`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Todo title"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description (optional)"
            rows="2"
          />
          
          <div className="flex gap-3">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({...editData, priority: e.target.value})}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({...editData, dueDate: e.target.value})}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={isUpdating}
              className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-md disabled:opacity-50"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-3 flex-1">
              <button
                onClick={handleToggleComplete}
                disabled={isUpdating}
                className={`mt-1 p-1 rounded-full ${
                  todo.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <Check size={16} />
              </button>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-600"
                title="Edit todo"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Delete todo"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              
              {todo.dueDate && (
                <div className={`flex items-center gap-1 ${
                  isOverdue ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {isOverdue && <AlertCircle size={14} />}
                  <Calendar size={14} />
                  <span>{formatDate(todo.dueDate)}</span>
                </div>
              )}
            </div>
            
            <span className="text-gray-400 text-xs">
              {formatDate(todo.createdAt)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}