import './App.css'
import { NewHeader, NewHero, NewExperience, NewTechOrbit, NewProjects, NewContact, NewFooter } from './Components/NewElements'

function App() {
  return <>
    <div className='align-left'>
      <NewHeader />
      <NewHero />
      <NewExperience />
      <NewTechOrbit />
      <NewProjects />
      <NewContact />
      <NewFooter />
    </div>
  </>
}

export default App
