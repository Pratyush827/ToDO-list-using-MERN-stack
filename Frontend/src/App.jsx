import {useState} from 'react';


function App() {

  const [newTodo, setnewTodo] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Manager</h1>
        </div>
        <form className="flex items-center border gap-2 border-gray-300 p-2 rounded-lg ">
          <input type="text" value={newTodo}
          onChange={(e)=> setnewTodo(e.target.value)}
          placeholder="Things to do !!" 
          className="flex-1 outline-none px-2 py-2 text-gray-800 placeholder-gray-400 "
          required />

          <button type="submit" className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg cursor-pointer">Add tasks</button>
        </form>
      </div>
    </div>
  )
}

export default App
