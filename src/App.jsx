import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Welcome from './components/Welcome';
import Game from './components/Game';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="game" element={<Game />} />
        <Route path="gameover" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;