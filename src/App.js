import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import './App.css';
import loader from './loadRocket.gif';

const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }


  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="App-header">SpaceX Launch Programs</h1>
         
            <div className="row">
              <div className="column1">
                <div className="App-filter-card">
                  
                    <h3 className="App-filter-header">
                      Filters
                    </h3>
                    <p className="App-filter-heading-launch-year">
                      Launch Year
                      <hr className="App-filters-hr" />
                    </p>

                    <div>
                      <div className="App-filter-button-container">
                        {uniqueLaunchYears.map((year) => {
                          return (
                            <button
                              className={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "App-filter-button-clicked"
                                  : "App-filter-button"
                              }
                              
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                      </div>

                    <p className="App-filter-heading">
                      Successful Launch
                      <hr className="App-filters-hr" />
                    </p>

                    <div className="App-filter-button-container">
                      <button
                        className={
                          this.state.filters.launch_success === "true"
                            ? "App-filter-button-clicked"
                            : "App-filter-button"
                        }
                        
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                        className={
                          this.state.filters.launch_success === "false"
                            ? "App-filter-button-clicked"
                            : "App-filter-button"
                        }
                       
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </button>
                    </div>

                    <p className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filters-hr" />
                    </p>
                    <div className="App-filter-button-container">
                      <button
                        className={
                          this.state.filters.land_success === "true"
                            ? "App-filter-button-clicked"
                            : "App-filter-button"
                        }
                        
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                        className={
                          this.state.filters.land_success === "false"
                            ? "App-filter-button-clicked"
                            : "App-filter-button"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </button>
                    </div>
                 
                </div>
              </div>

              <div className="column2"> 
              <section className="cards">
                  {data.map((details) => {
                    return (
                        <RocketLaunchDetails details={details} />
                    );
                  })}
                </section>
              </div>
            </div>
            <div>
              <h5 className="App-Developers-name">
                Developed by : Priyank 
              </h5>
            </div>
          
        </div>
      );
    }

  }
}

export default App;
