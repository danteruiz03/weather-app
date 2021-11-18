import React from "react";
import Header from "./components/Header";
import Search from './components/Search';
import Card from './components/Card';


const host = "community-open-weather-map.p.rapidapi.com";
const apiKey = process.env.REACT_APP_API_KEY;

const AppPresentational = props => (
  <div>
    <Header></Header>
    <div className="body">
      <Search handleSearch={props.handleSearch}></Search>
      <Card data={props.data}></Card>
    </div>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      list: []
    }
  }

  composeEndpoint = (input) => {
    //params
    const separator = "%2C%20";
    const count = "10";
    const mode = null;
    const longitude = "0";
    const type = ["link", "accurate"].join(separator);
    const latitude = "0";
    const units = ["metric"].join(separator);

    //endpoint
    const endpoint = "https://community-open-weather-map.p.rapidapi.com/";
    const params = `find?q=${input}&cnt=${count}&mode=${mode}&lon=${longitude}&type=${type}&lat=${latitude}&units=${units}`;

    return endpoint + params;
  }

  handleSearch = (input) => {
    console.log(apiKey);
    if (input.trim() !== "") {
      let endpoint = this.composeEndpoint(input);

      fetch(endpoint, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": host,
          "x-rapidapi-key": apiKey
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.count > 0) {
            this.setState({ list: data.list })
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    return <AppPresentational handleSearch={this.handleSearch} data={this.state.list} />;
  }
}

export default App;
