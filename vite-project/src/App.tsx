import './App.css'
import FilmDetail from './pages/Film.tsx';
import Main from './pages/MainPage.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/films/:id" element={<FilmDetail />} />
      </Routes>
    </Router>
      {/* <Main/> */}
    </>
  )
}

export default App