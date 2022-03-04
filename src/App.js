import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/product' element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
