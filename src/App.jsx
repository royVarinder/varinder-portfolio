import { Routes, Route } from 'react-router-dom'
import './App.css'
import { NewHeader, NewHero, NewExperience, NewTechOrbit, NewSkills, NewProjects, NewSamples, NewContact, NewFooter } from './Components/NewElements'
import PrivacyPolicy from './Components/PrivacyPolicy'
import JewelleryMarket from './Components/JewelleryMarket'
import AgroIndustries from './Components/AgroIndustries'

function Home() {
  return (
    <div className='align-left'>
      <NewHeader />
      <NewHero />
      <NewExperience />
      <NewTechOrbit />
      <NewSkills />
      <NewProjects />
      <NewSamples />
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
      <Route path="/jewellery-market" element={<JewelleryMarket />} />
      <Route path="/agro-industries" element={<AgroIndustries />} />
    </Routes>
  )
}

export default App
