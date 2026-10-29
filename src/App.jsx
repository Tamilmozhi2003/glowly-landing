import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </SmoothScroll>
  );
}

export default App;
