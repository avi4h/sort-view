import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VisualizerPage from './components/VisualizerPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/visualizer" element={<VisualizerPage />} />
            </Routes>
        </Router>
    );
}

export default App;