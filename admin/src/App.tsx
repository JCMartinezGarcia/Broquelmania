import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home.tsx';
import Clients from './views/clients/list/Clients.tsx';
import './App.css'

function App() {
  const clientViewList: string = "list";
  const clientsViews: string[] = ['list', 'create', 'update', 'details'];

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/clients" element={<Clients view={clientsViews[0]} />} />
          <Route path="/clients/register" element={<Clients view={clientsViews[1]} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
