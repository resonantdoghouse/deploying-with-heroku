import React, { Component } from 'react';
import axios from 'axios';
import Warehouse from './components/Warehouse';
import './App.css';

class App extends Component {
  state = {
    warehouses: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('/api/warehouse')
      .then((response) => {
        this.setState({
          warehouses: response.data,
        });
      })
      .catch((error) => console.error(error));
  };

  render() {
    const { warehouses } = this.state;

    return (
      <div className="App">
        <h1>Deploying With Heroku</h1>
        <Warehouse warehouses={warehouses} />
      </div>
    );
  }
}

export default App;
