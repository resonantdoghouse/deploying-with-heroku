import React, { Component } from 'react';
import axios from 'axios';
import Warehouse from './components/Warehouse';
import './App.css';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://deploying-with-heroku.herokuapp.com'
    : 'http://localhost:5000';

class App extends Component {
  state = {
    warehouses: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(`${API_URL}/api/warehouse`)
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
