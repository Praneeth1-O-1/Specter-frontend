import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PdfViewer from './Pdfview.jsx'
import SplineViewer from './Spline.jsx'
import Result from './Pages/Result.jsx'
import SplineModel from './Spline.jsx'

createRoot(document.getElementById('root')).render(
   <App />
)
