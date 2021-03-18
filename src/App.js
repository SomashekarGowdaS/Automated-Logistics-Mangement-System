import React from 'react'
import { Route } from 'react-router'
import CustomersContainer from './container/CustomersContainer';
import Home from './container/Home'
import ItemsContainer from './container/Items/ItemsContainer';
import NavBar from './container/NavBar'
import OrdersContainer from './container/OrdersContainer';
import VehiclesContainer from './container/Vehicles/VehiclesContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <Route path="/" component={Home} exact={true} />
      <Route path="/vehicles" component={VehiclesContainer} />
      <Route path="/items" component={ItemsContainer} />
      <Route path="/customers" component={CustomersContainer} />
      <Route path="/orders" component={OrdersContainer} />
    </div>
  );
}

export default App;
