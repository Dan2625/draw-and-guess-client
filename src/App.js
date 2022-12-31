import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import WordChoosingPage from './pages/WordChoosingPage';
import GuessingPage from './pages/GuessingPage';
//import './App.css';
import Layout from './Layout/Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/drawer" element={<WordChoosingPage />} />
            <Route path="/guessing" element={<GuessingPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
