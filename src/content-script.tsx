import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './content-script.css'

// Mount function that will be called by content script
function mountReactSidebar() {
  const container = document.getElementById('react-sidebar-root')
  if (container && !container.hasChildNodes()) {
    const root = createRoot(container)
    root.render(React.createElement(App))
  }
}

// Make mount function available globally
declare global {
  interface Window {
    mountReactSidebar: () => void
  }
}

window.mountReactSidebar = mountReactSidebar
