import logo from './logo.svg'
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Intro from "./Scenes/index"

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </Router>
    
  )
}

export default App
