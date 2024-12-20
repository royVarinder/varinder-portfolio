import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { About, Contact, Experience, Footer, Header, Hero, Projects, Skills } from './Components/Elements'

function App() {
  const [count, setCount] = useState(0)

  return <>
    <div className='align-left'>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      {/* <Contact /> */}
      <Footer />
    </div>

  </>
}

export default App
