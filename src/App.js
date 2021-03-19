import React from 'react'
import { Route } from 'react-router'
import CustomersContainer from './containers/Customers';
import Home from './containers/Home/Home'
import ItemsContainer from './containers/Items';
import NavBar from './containers/NavBar'
import OrdersContainer from './containers/Orders';
import VehiclesContainer from './containers/Vehicles';
import { ToastContainer } from 'react-toastify';

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
