import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import ApperIcon from './ApperIcon';

const MainFeature = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([
    { id: '1', name: 'Work', color: '#3b82f6' },
    { id: '2', name: 'Personal', color: '#10b981' },
    { id: '3', name: 'Shopping', color: '#f59e0b' },
    { id: '4', name: 'Health', color: '#ef4444' }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: ''
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    categoryId: '1'
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title is required');
      return;
    }

<div className="flex items-start gap-3 sm:gap-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="drag-handle flex-shrink-0 p-1 mt-1"
        >
          <ApperIcon name="GripVertical" className="w-4 h-4" />
        </div>

        <motion.button
          onClick={() => onToggleStatus(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.status === 'completed'
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-surface-300 hover:border-primary'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.status === 'completed' && (
            <ApperIcon name="Check" className="w-4 h-4" />
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className={`text-base sm:text-lg font-semibold mb-1 ${
                task.status === 'completed' 
                  ? 'line-through text-surface-500 dark:text-surface-400' 
                  : 'text-surface-900 dark:text-white'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-2 sm:mb-3">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border priority-${task.priority}`}
                >
                  <ApperIcon name={getPriorityIcon(task.priority)} className="w-3 h-3" />
                  {task.priority}
                </span>

                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border"
                  style={{ 
                    backgroundColor: `${category?.color}15`,
                    borderColor: `${category?.color}30`,
                    color: category?.color 
                  }}
                >
                  <ApperIcon name="Tag" className="w-3 h-3" />
                  {category?.name}
                </span>

                {task.dueDate && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                    isOverdue 
                      ? 'bg-red-100 text-red-800 border-red-200' 
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    <ApperIcon name="Calendar" className="w-3 h-3" />
                    {formatDueDate(task.dueDate)}
                    {isOverdue && <ApperIcon name="AlertCircle" className="w-3 h-3 ml-1" />}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <motion.button
                onClick={() => onEdit(task)}
                className="p-2 rounded-lg text-surface-600 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Edit3" className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={() => onDelete(task.id)}
                className="p-2 rounded-lg text-surface-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainFeature = () => {
    const task = {
      id: Date.now().toString(),
      ...newTask,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isRecurring: false
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      categoryId: '1'
    });
    setIsFormOpen(false);
    toast.success('Task created successfully!');
  };

  const updateTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setTasks(prev => prev.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...newTask, updatedAt: new Date().toISOString() }
        : task
    ));
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      categoryId: '1'
    });
    setIsFormOpen(false);
    toast.success('Task updated successfully!');
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully!');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return { ...task, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return task;
    }));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      categoryId: task.categoryId
    });
    setIsFormOpen(true);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      categoryId: '1'
    });
    setIsFormOpen(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.category !== 'all' && task.categoryId !== filters.category) return false;
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const overdue = tasks.filter(t => t.dueDate && isPast(new Date(t.dueDate)) && t.status !== 'completed').length;
    
    return { total, completed, inProgress, pending, overdue };
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd');
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'Minus';
      default: return 'Minus';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle2';
      case 'in-progress': return 'PlayCircle';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  const stats = getTaskStats();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        {[
          { label: 'Total Tasks', value: stats.total, icon: 'List', color: 'text-primary' },
          { label: 'Completed', value: stats.completed, icon: 'CheckCircle2', color: 'text-green-600' },
          { label: 'In Progress', value: stats.inProgress, icon: 'PlayCircle', color: 'text-blue-600' },
          { label: 'Pending', value: stats.pending, icon: 'Clock', color: 'text-yellow-600' },
          { label: 'Overdue', value: stats.overdue, icon: 'AlertTriangle', color: 'text-red-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="card p-4 sm:p-6 text-center hover:shadow-soft transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className={`mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 ${stat.color} bg-current bg-opacity-10`}>
              <ApperIcon name={stat.icon} className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
            <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-4 sm:p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="input-field pl-10"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="input-field min-w-0 flex-1 sm:flex-none sm:w-32"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="input-field min-w-0 flex-1 sm:flex-none sm:w-32"
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              className="input-field min-w-0 flex-1 sm:flex-none sm:w-32"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            <motion.button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Plus" className="w-5 h-5" />
              <span className="hidden sm:inline">New Task</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Task List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-3 sm:space-y-4"
      >
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card p-8 sm:p-12 text-center"
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center mb-4">
                <ApperIcon name="CheckSquare" className="w-8 h-8 sm:w-10 sm:h-10 text-surface-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                {tasks.length === 0 
                  ? 'Create your first task to get started with TaskFlow' 
                  : 'Try adjusting your filters or search criteria'
                }
              </p>
              {tasks.length === 0 && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="btn-primary"
                >
                  Create Your First Task
                </button>
              )}
            </motion.div>
          ) : (
            filteredTasks.map((task, index) => {
              const category = categories.find(c => c.id === task.categoryId);
              const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'completed';
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`card p-4 sm:p-6 hover:shadow-soft transition-all duration-200 ${
                    task.status === 'completed' ? 'status-completed' : 
                    task.status === 'in-progress' ? 'status-in-progress' : 'status-pending'
                  } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}
                  whileHover={{ y: -1 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <motion.button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.status === 'completed'
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-surface-300 hover:border-primary'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {task.status === 'completed' && (
                        <ApperIcon name="Check" className="w-4 h-4" />
                      )}
                    </motion.button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base sm:text-lg font-semibold mb-1 ${
                            task.status === 'completed' 
                              ? 'line-through text-surface-500 dark:text-surface-400' 
                              : 'text-surface-900 dark:text-white'
                          }`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-surface-600 dark:text-surface-400 mb-2 sm:mb-3">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border priority-${task.priority}`}
                            >
                              <ApperIcon name={getPriorityIcon(task.priority)} className="w-3 h-3" />
                              {task.priority}
                            </span>

                            <span
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border"
                              style={{ 
                                backgroundColor: `${category?.color}15`,
                                borderColor: `${category?.color}30`,
                                color: category?.color 
                              }}
                            >
                              <ApperIcon name="Tag" className="w-3 h-3" />
                              {category?.name}
                            </span>

                            {task.dueDate && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                                isOverdue 
                                  ? 'bg-red-100 text-red-800 border-red-200' 
                                  : 'bg-blue-100 text-blue-800 border-blue-200'
                              }`}>
                                <ApperIcon name="Calendar" className="w-3 h-3" />
                                {formatDueDate(task.dueDate)}
                                {isOverdue && <ApperIcon name="AlertCircle" className="w-3 h-3 ml-1" />}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <motion.button
                            onClick={() => startEditing(task)}
                            className="p-2 rounded-lg text-surface-600 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ApperIcon name="Edit3" className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 rounded-lg text-surface-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && cancelEdit()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <button
                  onClick={cancelEdit}
                  className="p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter task title..."
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="input-field h-24"
                    placeholder="Enter task description..."
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Priority
                    </label>
                    <select
                      className="input-field"
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Status
                    </label>
                    <select
                      className="input-field"
                      value={newTask.status}
                      onChange={(e) => setNewTask(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="input-field"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <select
                      className="input-field"
                      value={newTask.categoryId}
                      onChange={(e) => setNewTask(prev => ({ ...prev, categoryId: e.target.value }))}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button
                    onClick={editingTask ? updateTask : createTask}
                    className="btn-primary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </motion.button>
                  <motion.button
                    onClick={cancelEdit}
                    className="btn-secondary flex-1 sm:flex-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;