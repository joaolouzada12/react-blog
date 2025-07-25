import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from "./components/NavBar"

function App() {
  return (
  <div className="App">
    <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>

  );
}

export default App
