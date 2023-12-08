import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import ListDetail from './pages/ListDetail';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from './components/navbar';
import { ThemeProvider } from './context/Theme';
export default function App() {
  return (

    <>
      <ThemeProvider>
        <div>
          <AppNavbar />
        </div>
        <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="listdetail" element={<ListDetail />} />
              <Route path="listdetail/:listId" element={<ListDetail />} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);