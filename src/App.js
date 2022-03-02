import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/createaccount' element={<CreateAccount />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/product' element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
