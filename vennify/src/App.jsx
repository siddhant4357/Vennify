import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TheoryPage from './pages/TheoryPage'
import PracticePage from './pages/PracticePage'
import VisualizerPage from './pages/VisualizerPage'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to homepage */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/practice/:operation" element={<PracticePage />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
      </Routes>
    </Router>
  )
}

export default App