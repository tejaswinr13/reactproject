import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { NutritionsTable, AddNutrition } from './components';
import {Router, Route} from 'react-router-dom';

const history = require("history").createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <div className="mw9 center ph3-ns">
          <div className="cf ph2-ns">
            <div className="fl w-100 pa2">
              <div className="pv4">
                <main className="pa4 mw9 center ph3-ns black-80 card bg-white">
                  <Router history={history}>
                    <Route path="/" exact>
                      <NutritionsTable client={this.props.client} />
                    </Route>
                    <Route path="/add" component={AddNutrition} />
                  </Router>                 
                </main>
              </div>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default connect()(App)