import { useState, useEffect } from 'react';
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from 'axios';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post('/api/todos', { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
      console.log("Todo added successfully:", response.data);
    } catch (error) {
      console.log("Error adding todo :" + error.message);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
      console.log("Todos fetched successfully:", response.data);
    } catch (error) {
      console.log("Error fetching todos:" + error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText
      });
      setTodos(todos.map((todo) => todo._id === id ? response.data : todo));
      setEditingTodo(null);
    } catch (err) {
      console.log("Error saving edit:", err);
    }
  };

  const deleteTodo = async (id) =>{
    try{
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      console.log("Todo deleted successfully");
    }catch(error){
      console.log("Error deleting the todo :" , error);
    }
  }

  const toggleTodo = async (id) => {
    try {
      const currentTodo = todos.find((t) => t._id === id);
      if (!currentTodo) return;

      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !currentTodo.completed,
      });
      console.log("Response data from backend:", response.data);

      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-500 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 m-6 mb-8 text-center">Task Manager</h1>
          </div>
          <form
            className="flex justify-between items-center gap-4 shadow-sm border border-gray-300 p-2 rounded-lg mb-5"
            onSubmit={addTodo}
          >
            <input
              className="ml-2 flex-1 outline-none text-gray-700 color-gray-400 placeholder-gray-400"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done ??"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-800 cursor-pointer transition-colors duration-1000"
            >
              Add Task
            </button>
          </form>
          <div>
            {todos.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {todos.map((todo) => (
                  <div key={todo._id}>
                    {editingTodo === todo._id ? (
                      <div className="flex items-center gap-x-2">
                        <input
                          className="flex-1 outline-none text-gray-700 shadow-inner border border-gray-200 rounded-lg p-3 my-2 focus:ring-blue-500 focus:ring-2"
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <div className="flex gap-x-2">
                          <button
                            onClick={() => saveEdit(todo._id)}
                            className="bg-green-600 text-white rounded-sm px-4 py-2 text-2xl hover:bg-green-800 cursor-pointer"
                          >
                            <MdOutlineDone />
                          </button>
                          <button
                            className="bg-red-600 text-white rounded-sm px-4 py-2 text-2xl hover:bg-red-800 cursor-pointer"
                            onClick={() => setEditingTodo(null)}
                          >
                            <IoClose />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center py-5 px-1">
                          <div className="flex items-center gap-x-3 overflow-hidden">
                            <button
                              onClick={() => toggleTodo(todo._id)}
                              className={`flex-shrink-0 h-6 w-6 border rounded-full flex justify-center items-center transition-colors duration-300
                                ${todo.completed ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-400 border-gray-300 hover:border-blue-300'}`}
                            >
                              <MdOutlineDone className={`${todo.completed ? 'block' : 'hidden'}`} />
                            </button>


                            <span className="text-gray-800 truncate font-bold">{todo.text}</span>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <button
                              className="text-2xl text-blue-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
                              onClick={() => startEditing(todo)}
                            >
                              <MdModeEditOutline />
                            </button>
                            <button onClick={() => deleteTodo(todo._id)} 
                            className="text-2xl text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
