import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from "./layouts/main_layout";
import './styles/main.scss';


function App() {
  return (
    <>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </>
  )
}

export default App
