import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import './App.css';

function Layout() {
  return (
    <>
      <HeaderComponent title="Student Information Application" />
      <main className="app-main">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
