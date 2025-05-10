import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './fonts.css' // Import the font styles first
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
