import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TheoryPage from './pages/TheoryPage'
import PracticePage from './pages/PracticePage'
import VisualizerPage from './pages/VisualizerPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/practice/:operation" element={<PracticePage />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
        {/* Catch all route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App