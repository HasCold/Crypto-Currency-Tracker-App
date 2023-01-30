import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Alert from './Pages/components/Alert';
import Home from './Pages/Home';

function App() {

  document.title = "Blockchain Asset Hunter";
  return (
    <Router>
    <div className={"App"}>
      <Header/>
      <Routes>

  {/* Home Page */}
    <Route exact path='/' element={<Home />}></Route>
    <Route path='/coins/:id' element={<CoinPage />}></Route>

      </Routes>
    </div>
    <Alert />
    </Router>
  )
}

export default App;
