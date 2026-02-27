import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import MediaDetail from './components/MediaDetail.tsx'
import { MediaProvider } from './context/MediaContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MediaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:type/:id" element={<MediaDetail />} />
        </Routes>
      </BrowserRouter>
    </MediaProvider>
  </StrictMode>
)