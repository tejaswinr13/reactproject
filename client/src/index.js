import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from 'react-redux';
import createReduxStore from './redux/store';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const store = createReduxStore();

ReactDOM.render(<ApolloProvider client={client}>
	<Provider store={store}>
		<App client={client} />
	</Provider>
</ApolloProvider>, document.getElementById('root'));