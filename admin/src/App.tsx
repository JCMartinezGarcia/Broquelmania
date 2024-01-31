import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home.tsx';
import Clients from './views/clients/list/Clients.tsx';
import Suppliers from './views/suppliers/Suppliers.tsx';
import SuppliersRegister from './views/suppliers/SuppliersRegister.tsx';
import SuppliersEdit from './views/suppliers/SuppliersEdit.tsx';

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
          <Route path='/proveedores/listado' element={<Suppliers />} />
          <Route path="/proveedores/registro" element={<SuppliersRegister />} />
          <Route path="/proveedores/editar/:id" element={<SuppliersEdit />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
