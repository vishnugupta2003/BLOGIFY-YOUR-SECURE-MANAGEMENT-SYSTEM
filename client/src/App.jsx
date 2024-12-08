import Auth from './pages/auth';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import ProtectedRoute from './components/route';
import OneBlog from './pages/blog';
const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Router>
        <Routes>
          <Route exact path='/' Component={Auth}></Route>
          <Route Component={ProtectedRoute}>
            <Route exact path='/home' Component={Home}></Route>
            <Route exact path='/blog' Component={OneBlog}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
