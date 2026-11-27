import { Routes, Route, NavLink } from 'react-router-dom';
import { DartsLista } from './pages/DartsLista';
import { EgyDarts } from './pages/EgyDarts';
import { UjDarts } from './pages/UjDarts';
import { ModDarts } from './pages/ModDarts';
import { DelDarts } from './pages/DelDarts';
import './App.css';

export const App = () => {

  return (
    <>
    <nav className="d-flex gap-4 p-3 fs-3">
    <NavLink to="/" className="nav-link">
    <i className="bi bi-house-door-fill me-2"></i> Dartsozók
    </NavLink>
        <NavLink to="/new-darts" className="nav-link">
    <i className="bi bi-info-circle-fill me-2"></i> Új dartsozó
    </NavLink>

    </nav>
    <Routes>
      <Route path="/darts/:dartsId" element={<EgyDarts />} />
      <Route path="/" element={<DartsLista />} />
      <Route path="/new-darts" element={<UjDarts />} />
      <Route path="/mod-darts/:dartsId" element={<ModDarts />} />
      <Route path="/del-darts/:dartsId" element={<DelDarts />} />
    </Routes>
    </>
  )
};