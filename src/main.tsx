import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { HepMoodProvider } from './context/HepMoodContext.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HepMoodProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HepMoodProvider>
  </React.StrictMode>,
)
