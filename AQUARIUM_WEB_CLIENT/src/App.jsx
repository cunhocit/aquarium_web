import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import Home from "./pages/home";
import Store from './pages/store';
import Search from './pages/search';

import './styles/main.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/store' element={<Store />}></Route>
        <Route exact path='/search' element={<Search />}></Route>
      </Routes>
    </Router>
  )
}

export default App
