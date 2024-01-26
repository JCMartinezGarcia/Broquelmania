import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home.tsx';
import Clients from './views/clients/list/Clients.tsx';
import './App.css'

function App() {
  const clientsViews: string[] = ['list', 'create', 'update', 'details'];

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients view={clientsViews[0]} />} />
          <Route path="/clients/register" element={<Clients view={clientsViews[1]} />} />
          <Route path="/clients/edit/:id" element={<Clients view={clientsViews[2]} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
