import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

import '@fontsource/roboto'
import '@fontsource/noto-sans-thai'
import '@fontsource/noto-sans-jp'

// FIXME: Import problems
import '@fontsource/noto-color-emoji/emoji.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
