import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home.tsx';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </Router>
    </>
  )
}

export default App
