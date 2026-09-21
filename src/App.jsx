import { Routes, Route } from 'react-router-dom'
import './App.css'
import { NewHeader, NewHero, NewExperience, NewTechOrbit, NewSkills, NewProjects, NewContact, NewFooter } from './Components/NewElements'
import PrivacyPolicy from './Components/PrivacyPolicy'

function Home() {
  return (
    <div className='align-left'>
      <NewHeader />
      <NewHero />
      <NewExperience />
      <NewTechOrbit />
      <NewSkills />
      <NewProjects />
      <NewContact />
      <NewFooter />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default App
